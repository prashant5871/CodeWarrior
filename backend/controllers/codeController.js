import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import TestCase from '../models/testCaseModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exeDir = path.resolve(__dirname, '../executes');

export const getResultOfCpp = async (req, res) => {
    const { code, problem } = req.body;

    const uniqueFileName = `${uuidv4()}.cpp`;
    const filePath = path.join(exeDir, uniqueFileName);

    if (!fs.existsSync(exeDir)) {
        fs.mkdirSync(exeDir, { recursive: true });
    }

    fs.writeFileSync(filePath, code);

    try {
        const testCases = await TestCase.find({ problem });

        const execCompile = `g++ ${filePath} -o ${filePath.replace('.cpp', '')}`;
        exec(execCompile, (compileError) => {
            if (compileError) {

                cleanupFiles(filePath, filePath.replace('.cpp', ''));
                return res.status(400).json({ message: "Compilation Error", error: compileError });
            }

            let wrongAnswers = 0;

            const runTestCase = (index) => {
                if (index >= testCases.length) {

                    if (wrongAnswers === 0) {
                        res.status(200).json({ message: "All test cases passed", success: true });
                    } else {
                        res.status(200).json({ message: `Wrong answer on test case ${wrongAnswers}`, success: false });
                    }


                    cleanupFiles(filePath, filePath.replace('.cpp', '.exe'));
                    return;
                }

                const testCase = testCases[index];
                const inputFilePath = path.join(exeDir, `${uuidv4()}.txt`);

                fs.writeFileSync(inputFilePath, testCase.input);

                const execRun = `${filePath.replace('.cpp', '')} < ${inputFilePath}`;
                // console.log(execRun);
                exec(execRun, (runError, stdout) => {
                    if (runError) {
                        wrongAnswers++;
                    } else if (stdout.trim() !== testCase.expectedOutput.trim()) {
                        console.log(`Expected: ${testCase.expectedOutput}, Got: ${stdout.trim()}`);
                        wrongAnswers++;
                    }


                    if (fs.existsSync(inputFilePath)) {
                        fs.unlinkSync(inputFilePath);
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
    if (fs.existsSync(cppFilePath)) {
        fs.unlinkSync(cppFilePath);
    }
    if (fs.existsSync(exeFilePath)) {
        fs.unlinkSync(exeFilePath);
    }
};

