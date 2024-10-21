import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { exec, execFile } from 'child_process';
import TestCase from '../models/testCaseModel.js';
import Submission from '../models/submissionModel.js';
import Problem from '../models/problemModel.js';
import User from "../models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exeDir = path.resolve(__dirname, '../executes');


export const runCpp = async (req, res) => {
    const { code, problem, input } = req.body;
    const language = "c++";

    const uniqueFileName = `${uuidv4()}.cpp`;
    const filePath = path.join(exeDir, uniqueFileName);

    if (!fs.existsSync(exeDir)) {
        fs.mkdirSync(exeDir, { recursive: true });
    }

    fs.writeFileSync(filePath, code);

    try {
        // const testCases = await TestCase.find({ problem });

        const execCompile = `g++ ${filePath} -o ${filePath.replace('.cpp', '')}`;
        exec(execCompile, async (compileError, stdout, stderr) => {
            if (compileError) {
                cleanupFiles(filePath, filePath.replace('.cpp', ''));
                console.log("Compilation Error!");
                res.status(200).json({output:"Compile time error"});
                return;
            }

            let wrongTestCases = [];
            let passedTestCases = [];
            let result = "Success";


            const testCase = input;
            const inputFilePath = path.join(exeDir, `${uuidv4()}.txt`);

            fs.writeFileSync(inputFilePath, testCase);

            const execRun = `${filePath.replace('.cpp', '')} < ${inputFilePath}`;

            const timeout = setTimeout(() => {
                cleanupFiles(filePath, filePath.replace('.cpp', '.exe'));
                result = "Time Limit Exceeded";
                return res.status(400).json({ timeLimitExceeded: true, output: "Time Limit Exceeded", testCaseId: testCase._id });
            }, 5000);


            exec(execRun, (runError, stdout) => {
                clearTimeout(timeout);

                if (runError) {
                    return res.status(200).json({output : "Runtime error"});
                }

                cleanupFiles(filePath, filePath.replace('.cpp', '.exe'));

                if (fs.existsSync(inputFilePath)) {
                    try {
                        fs.unlinkSync(inputFilePath);
                    } catch (err) {
                        console.error(`Failed to delete input file: ${inputFilePath}`, err);
                    }
                }

                return res.status(200).json({output : stdout});

            
            });
            
        });
    } catch (error) {
        console.log(error);
        cleanupFiles(filePath, filePath.replace('.cpp', '.exe'));
        res.status(500).json({ message: "An error occurred", error });
    }

}
export const submitCpp = async (req, res) => {
    const { code, problem } = req.body;
    const language = "c++";

    const uniqueFileName = `${uuidv4()}.cpp`;
    const filePath = path.join(exeDir, uniqueFileName);

    if (!fs.existsSync(exeDir)) {
        fs.mkdirSync(exeDir, { recursive: true });
    }

    fs.writeFileSync(filePath, code);

    try {
        const testCases = await TestCase.find({ problem });

        const execCompile = `g++ ${filePath} -o ${filePath.replace('.cpp', '')}`;
        exec(execCompile, async (compileError, stdout, stderr) => {
            if (compileError) {
                cleanupFiles(filePath, filePath.replace('.cpp', ''));
                console.log("Compilation Error!");
                createSubmissionForCompileTimeError(stderr, req.id, problem, filePath, language, res, [], []);
                return;
            }

            let wrongTestCases = [];
            let passedTestCases = [];
            let result = "Success";

            const runTestCase = (index) => {
                if (index >= testCases.length) {
                    if (wrongTestCases.length > 0) {
                        result = "Failed";
                    }
                    cleanupFiles(filePath, filePath.replace('.cpp', '.exe'));
                    createSubmission(result, req.id, problem, filePath, language, res, wrongTestCases, passedTestCases);
                    return;
                }

                const testCase = testCases[index];
                const inputFilePath = path.join(exeDir, `${uuidv4()}.txt`);

                fs.writeFileSync(inputFilePath, testCase.input);

                const execRun = `${filePath.replace('.cpp', '')} < ${inputFilePath}`;

                const timeout = setTimeout(() => {
                    cleanupFiles(filePath, filePath.replace('.cpp', '.exe'));
                    result = "Time Limit Exceeded";
                    return res.status(400).json({ timeLimitExceeded: true, message: "Time Limit Exceeded", testCaseId: testCase._id });
                }, 5000);


                exec(execRun, (runError, stdout) => {
                    clearTimeout(timeout);

                    if (runError) {
                        wrongTestCases.push({
                            id: testCase._id,
                            input: testCase.input,
                            expectedOutput: testCase.expectedOutput,
                            error: "Runtime Error",
                        });
                        result = "Failed";
                    } else if (stdout.trim() !== testCase.expectedOutput.trim()) {
                        wrongTestCases.push({
                            id: testCase._id,
                            input: testCase.input,
                            expectedOutput: testCase.expectedOutput,
                            output: stdout.trim(),
                        });
                        result = "Failed";
                    } else {
                        passedTestCases.push({
                            id: testCase._id,
                            input: testCase.input,
                            expectedOutput: testCase.expectedOutput,
                        });
                    }

                    if (fs.existsSync(inputFilePath)) {
                        try {
                            fs.unlinkSync(inputFilePath);
                        } catch (err) {
                            console.error(`Failed to delete input file: ${inputFilePath}`, err);
                        }
                    }

                    runTestCase(index + 1);
                });
            };

            runTestCase(0);
        });
    } catch (error) {
        console.log(error);
        cleanupFiles(filePath, filePath.replace('.cpp', '.exe'));
        res.status(500).json({ message: "An error occurred", error });
    }
};

const cleanupFiles = (cppFilePath, exeFilePath) => {
    // Remove the cpp and exe files after processing
    try {

        if (fs.existsSync(exeFilePath)) {
            fs.unlinkSync(exeFilePath);
        }
    } catch (err) {
        console.error(`Failed to clean up files: ${err}`);
    }
};

// Helper function to create the submission and update the User and Problem models
const createSubmission = async (result, userId, problemId, filePath, language, res, wrongTestCases, passedTestCases) => {
    try {
        // Create a new submission
        const newSubmission = await Submission.create({
            language,
            result,
            problem: problemId,
            user: userId,
            filePath,
        });

        // Add submission to user's submissions
        await User.findByIdAndUpdate(userId, { $push: { submissions: newSubmission._id } });

        // Add submission to problem's submissions
        await Problem.findByIdAndUpdate(problemId, { $push: { submissions: newSubmission._id } });

        if (wrongTestCases.length === 0 && passedTestCases.length !== 0) {
            res.status(200).json({
                message: "All test cases passed",
                success: true,
                passedTestCases: passedTestCases.slice(0, Math.min(5, passedTestCases.length)).map(tc => ({
                    id: tc.id,
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                })),
            });
        } else {
            res.status(200).json({
                message: result,
                success: false,
                wrongTestCases: wrongTestCases,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating submission", error });
    }
};



// Helper function to create the submission and update the User and Problem models
const createSubmissionForCompileTimeError = async (result, userId, problemId, filePath, language, res, wrongTestCases, passedTestCases) => {
    try {
        console.log(result);
        // Create a new submission
        const newSubmission = await Submission.create({
            language,
            result: "Compile Error",
            problem: problemId,
            user: userId,
            filePath,
        });

        // Add submission to user's submissions
        await User.findByIdAndUpdate(userId, { $push: { submissions: newSubmission._id } });

        // Add submission to problem's submissions
        await Problem.findByIdAndUpdate(problemId, { $push: { submissions: newSubmission._id } });


        res.status(200).json({
            message: result,
            success: false,
            compiled: false
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating submission", error });
    }
};
