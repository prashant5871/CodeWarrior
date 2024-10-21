import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { indentOnInput } from '@codemirror/language';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Problem = () => {
  const { problemId } = useParams();
  const [code, setCode] = useState(`#include<bits/stdc++.h>\n\nusing namespace std;\n\nint main()\n{\n  cout << "Hello world" << endl;\n}\n`);
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [problems, setProblems] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [wrongTestCases, setWrongTestCases] = useState([]);
  const [passedTestCases, setPassedTestCases] = useState([]);
  const [timeLimitExceeded, setTimeLimitExceeded] = useState(false);

  const [currUser, setCurrUser] = useState(null)

  const [inputError,setInputError] = useState(false);

  useEffect(() => {

    if(localStorage.getItem("user"))
    {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrUser(user);
    }
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tags');
        const data = await response.json();
        setTags(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchProblems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/problems');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTags();
    fetchProblems();
  }, []);

  const problem = problems.find(problem => problem._id === problemId) || {};

  const getDifficultyClass = (level) => {
    switch (level) {
      case 'easy':
        return 'bg-green-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'hard':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getLanguage = (lang) => {
    switch (lang) {
      case 'cpp': return cpp();
      case 'python': return python();
      case 'java': return java();
      default: return cpp();
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setError('');
    setTimeLimitExceeded(false);
    setWrongTestCases([]);
    setPassedTestCases([]);
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch('http://localhost:5000/api/code/cpp/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, problem: problemId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      
      if (result.timeLimitExceeded) {
        setTimeLimitExceeded(true);
        setOutput('Time Limit Exceeded');
      } else if (result?.passedTestCases) {
        setOutput('All test cases passed!');
        setPassedTestCases(result?.passedTestCases?.slice(0, 5));
      } else if (result?.wrongTestCases ) {
        setOutput('Some test cases failed.');
        
        setWrongTestCases(result?.wrongTestCases?.slice(0,5));
        console.log("wrong test cases : ",wrongTestCases);
        // setPassedTestCases();
        // setPassedTestCases(result?.passedTestCases?.slice(0, 5));
      }else{
        setOutput("Something went wrong...");
        console.log(result?.message);
        
        setError( result?.message?.substring(0));
      }

    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    if(input.trim() === "")
    {
      setInputError(true);
      return;
    }
    setInputError(false);
    setLoading(true);
    setError('');
    setTimeLimitExceeded(false);
    setWrongTestCases([]);
    setPassedTestCases([]);
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch('http://localhost:5000/api/code/cpp/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, problem: problemId,input }),
      });

      if (!response.ok) {
        // throw new Error(`Error: ${response.statusText}`);
        setTimeLimitExceeded(true);
        setOutput("time limit exceeded");
        return;
      }

      const result = await response.json();
      console.log(result);
      
      if (result.timeLimitExceeded) {
        setTimeLimitExceeded(true);
        setOutput('Time Limit Exceeded');
      } 
      else{
        setOutput(result.output);
      }

    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const userId = 1;

  return (
    <div className="flex h-screen mt-16 bg-gray-100">
      {/* Left side: Problem description */}
      <div className="w-1/3 p-6 border-r bg-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          {problem.difficultyLevel && (
            <span className={`${getDifficultyClass(problem.difficultyLevel)} px-2 py-1 rounded-md`}>
              {problem.difficultyLevel.charAt(0).toUpperCase() + problem.difficultyLevel.slice(1)}
            </span>
          )}
        </div>
        <p className="mb-4 text-gray-700">{problem.description}</p>
        <div>
          <h3 className="font-bold mb-2">Constraints:</h3>
          <pre className="bg-gray-200 p-4 rounded">{problem.constraints}</pre>
        </div>
        <div className="mt-4">
          <h3 className="font-bold mb-2">Examples:</h3>
          <pre className="bg-gray-200 p-4 rounded">{problem.example}</pre>
        </div>
        {/* Tags */}
        {problem.tags && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Tags:</h3>
            <div className="flex flex-wrap">
              {problem.tags.map((tag) => (
                <span key={tag._id} className="bg-blue-100 text-blue-700 px-2 py-1 m-1 rounded-full text-sm">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}



        <Link to={`/mysubmission/${currUser?._id}/${problemId}`}>
          <div className='border rounded-xl bg-green-400 p-2 text-center mt-1 hover:bg-green-500'>Go to my Submissions</div>
        </Link>


      </div>

      {/* Right side: Code editor */}
      <div className="w-2/3 flex flex-col p-4">
        <div className="flex justify-between mb-2">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border p-2 rounded-md shadow-sm"
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          <div className='flex gap-2'>
            <button
              onClick={handleSubmitCode}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              Submit Code
            </button>
          
          
          <button
              onClick={handleRun}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              Run Code
            </button>
            </div>
        </div>

        {/* Code Editor Area */}
        <div className="relative flex-1">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-100 rounded-md">
              <div className="loader">Running...</div>
            </div>
          ) : (
            <CodeMirror
              value={code}
              theme={oneDark}
              extensions={[getLanguage(language), indentOnInput()]}
              onChange={(value) => setCode(value)}
              height="400px"
              className="border rounded-md shadow-md text-lg"
            />
          )}
        </div>

        {/* Bottom-right: Input and Output */}
        { inputError && <div className='text-red-600'>Please Provide valid input</div> }

        <div className="border-t flex justify-between p-4 bg-gray-50 mt-4">
          <div className="w-1/2 pr-2">
            <h3 className="font-bold mb-2">Input</h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-24 border p-2 rounded-md shadow-sm"
              placeholder="Provide custom input here..."
            />
          </div>
          <div className="w-1/2 pl-2">
            <h3 className="font-bold mb-2">Output</h3>
            <textarea
              readOnly
              value={output}
              className="w-full h-24 border p-2 bg-gray-100 rounded-md shadow-sm"
              placeholder="Output will be shown here after running code..."
            />
          </div>
        </div>


        {/* Time Limit Exceeded */}
        {timeLimitExceeded && (
          <div className="text-yellow-500 mt-2">⏱️ Time Limit Exceeded</div>
        )}

        {/* Display Passed Test Cases */}
        {passedTestCases && passedTestCases.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold text-green-600 mb-2">✅ Passed Test Cases:</h3>
            {passedTestCases.map((testCase, index) => (
              <div key={index} className="mb-2 p-2 border rounded-md bg-green-100">
                <strong>Input:</strong> {testCase.input}<br />
                <strong>Output:</strong> {testCase.expectedOutput}
              </div>
            ))}
          </div>
        )}

        {/* Display Failed Test Cases */}
        {wrongTestCases && wrongTestCases.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold text-red-600 mb-2">❌ Failed Test Cases:</h3>
            {wrongTestCases.map((testCase, index) => (
              <div key={index} className="mb-2 p-2 border rounded-md bg-red-100">
                <strong>Input:</strong> {testCase.input}<br />
                <strong>Expected Output:</strong> {testCase.expectedOutput}<br />
                <strong>Your Output:</strong> {testCase.output}
              </div>
            ))}
          </div>
        )}

        {/* Display Error Messages */}
        {error && (
          <div className="text-red-500 mt-2">⚠️ {error} </div>
        )}
      </div>
    </div>
  );
};

export default Problem;
