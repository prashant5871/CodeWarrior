import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const problemsData = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', acceptance: '54.0%' },
  { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', acceptance: '44.3%' },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', acceptance: '35.6%' },
  // More problems...
];

const ProblemPage = () => {
  const [filter, setFilter] = useState({
    difficulty: '',
    acceptance: ''
  });

  // Filter logic
  const filteredProblems = problemsData.filter(problem => {
    return (
      (filter.difficulty === '' || problem.difficulty === filter.difficulty) &&
      (filter.acceptance === '' || parseFloat(problem.acceptance) >= parseFloat(filter.acceptance))
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10 pt-20 text-gray-800"> {/* pt-20 ensures no overlap */}
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          {/* Filter by Difficulty */}
          <select
            className="p-2 rounded bg-white border border-gray-300"
            value={filter.difficulty}
            onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
          >
            <option value=''>All Difficulties</option>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>

          {/* Filter by Acceptance */}
          <input
            type="number"
            placeholder="Min Acceptance %"
            className="p-2 rounded bg-white border border-gray-300"
            value={filter.acceptance}
            onChange={(e) => setFilter({ ...filter, acceptance: e.target.value })}
          />
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search problem..."
          className="p-2 w-1/3 rounded bg-white border border-gray-300"
        />
      </div>

      {/* Problems Table */}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border border-gray-300">#</th>
            <th className="p-3 text-left border border-gray-300">Title</th>
            <th className="p-3 text-left border border-gray-300">Difficulty</th>
            <th className="p-3 text-left border border-gray-300">Acceptance</th>
            <th className="p-3 text-left border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, index) => (
              <tr key={problem.id} className="border-t border-gray-300">
                <td className="p-3 border border-gray-300">{problem.id}</td>
                <td className="p-3 border border-gray-300">{problem.title}</td>
                <td className="p-3 border border-gray-300">{problem.difficulty}</td>
                <td className="p-3 border border-gray-300">{problem.acceptance}</td>
                <td className="p-3 border border-gray-300">
                  <Link
                    to={`/problem/${problem.id}`}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    Solve
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center">No problems found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemPage;
