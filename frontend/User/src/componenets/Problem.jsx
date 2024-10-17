import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { indentOnInput } from '@codemirror/language';

const Problem = () => {
  const { problemId } = useParams(); // Get problem ID from URL
  const [code, setCode] = useState(`#include<bits/stdc++.h>\n\nusing namespace std;\n\nint main()\n{\n  cout << "Hello world" << endl;\n}\n`);
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // Define a function to return the correct class for difficulty level
  const getDifficultyClass = (level) => {
    switch (level) {
      case 'easy':
        return 'bg-green-500 text-white px-2 py-1 rounded-md';
      case 'medium':
        return 'bg-yellow-500 text-white px-2 py-1 rounded-md';
      case 'hard':
        return 'bg-red-500 text-white px-2 py-1 rounded-md';
      default:
        return 'bg-gray-400 text-white px-2 py-1 rounded-md';
    }
  };

  const problems = {
    1: {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      difficultyLevel: "easy", // New attribute for difficulty level
      constraints: "1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^9",
      examples: `Example:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]`,
      tags: ["array", "hashmap", "two pointers"], // New attribute for tags
    },
    // Add more problems here with difficultyLevel and tags
  };

  const problem = problems[problemId] || {};

  const getLanguage = (lang) => {
    switch (lang) {
      case 'cpp': return cpp();
      case 'python': return python();
      case 'java': return java();
      default: return cpp();
    }
  };

  const handleRunCode = () => {
    // Simulate an output based on the user's code
    setOutput('Code executed successfully!');
  };

  return (
    <div className="flex h-screen mt-16"> {/* Added margin-top to prevent overlap with navbar */}
      {/* Left side: Problem description */}
      <div className="w-1/3 p-6 border-r bg-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          {/* Difficulty Badge */}
          {problem.difficultyLevel && (
            <span className={getDifficultyClass(problem.difficultyLevel)}>
              {problem.difficultyLevel.charAt(0).toUpperCase() + problem.difficultyLevel.slice(1)}
            </span>
          )}
        </div>

        <p className="mb-4">{problem.description}</p>
        <div>
          <h3 className="font-bold mb-2">Constraints:</h3>
          <pre className="bg-gray-200 p-4 rounded">{problem.constraints}</pre>
        </div>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Examples:</h3>
          <pre className="bg-gray-200 p-4 rounded">{problem.examples}</pre>
        </div>
        {/* Tags */}
        {problem.tags && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Tags:</h3>
            <div className="flex flex-wrap">
              {problem.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 m-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right side: Code editor */}
      <div className="w-2/3 flex flex-col">
        <div className="flex-1 p-4">
          <div className="flex justify-between mb-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border p-2"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={handleRunCode}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Run Code
            </button>
          </div>
          <CodeMirror
            value={code}
            theme={oneDark}
            extensions={[getLanguage(language), indentOnInput()]}
            onChange={(value) => setCode(value)}
            height="400px"
          />
        </div>

        {/* Bottom-right: Input and Output */}
        <div className="border-t flex justify-between p-4 bg-gray-50">
          <div className="w-1/2 pr-2">
            <h3 className="font-bold mb-2">Input</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-24 border p-2"
              placeholder="Provide custom input here..."
            />
          </div>
          <div className="w-1/2 pl-2">
            <h3 className="font-bold mb-2">Output</h3>
            <textarea
              readOnly
              value={output}
              className="w-full h-24 border p-2 bg-gray-100"
              placeholder="Output will be shown here after running code..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
