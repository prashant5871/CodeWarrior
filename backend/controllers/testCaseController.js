import TestCase from "../models/testCaseModel.js";

export const CreateTestCase = async (input,expectedOutput,problem) =>
{
    try {
        const testCase = await TestCase.create({
            input,
            expectedOutput,
            problem
        });

        return testCase;
    } catch (error) {
        console.log(error);
    }

    return null;
}