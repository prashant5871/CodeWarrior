import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetchProblems from '../hooks/useFetchProblems'; 

const ProblemPage = () => {
  const [filter, setFilter] = useState({
    difficulty: '',
    search: ''
  });

  const { problems, loading, error } = useFetchProblems(); 
  console.log(problems);

  
  const matchesSearchTerm = (problem, searchTerm) => {
    const searchInLowerCase = searchTerm.toLowerCase();

    
    const matchesTitle = problem?.title.toLowerCase().includes(searchInLowerCase);
    const matchesDifficulty = problem.difficultyLevel.toLowerCase().includes(searchInLowerCase);
    const matchesDescription = problem.description.toLowerCase().includes(searchInLowerCase);
    const matchesTags = problem.tags.some(tag => tag?.name?.toLowerCase().includes(searchInLowerCase));

    return matchesTitle || matchesDifficulty || matchesDescription || matchesTags;
  };

  
  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = filter.difficulty === '' || problem.difficultyLevel === filter.difficulty;
    const matchesSearch = filter.search === '' || matchesSearchTerm(problem, filter.search);
    
    return matchesDifficulty && matchesSearch;
  });

  if (loading) {
    return <div className="text-center text-lg py-10">Loading problems...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-20 text-gray-800"> {/* pt-20 ensures no overlap */}
      {/* <h1 className="text-3xl font-bold text-center mb-10">Problem Dashboard</h1> */}

      {/* Filter Options */}
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          {/* Filter by Difficulty */}
          <select
            className="p-2 rounded bg-white border border-gray-300"
            value={filter.difficulty}
            onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
          >
            <option value=''>All Difficulties</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by title, difficulty, description, or tags..."
            className="p-2 w-96 rounded bg-white border border-gray-300"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>
      </div>

      {/* Problems Table */}
      <table className="w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left border border-gray-300">#</th>
            <th className="p-4 text-left border border-gray-300">Title</th>
            <th className="p-4 text-left border border-gray-300">Difficulty</th>
            <th className="p-4 text-left border border-gray-300">Tags</th>
            <th className="p-4 text-left border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, index) => (
              <tr key={problem._id} className="border-t border-gray-300 hover:bg-gray-50 transition duration-200">
                <td className="p-4 border border-gray-300">{index + 1}</td>
                <td className="p-4 border border-gray-300">{problem.title}</td>
                <td className={`p-4 border border-gray-300 font-semibold ${
                  problem.difficultyLevel === 'easy' ? 'text-green-500' : 
                  problem.difficultyLevel === 'medium' ? 'text-yellow-500' : 
                  'text-red-500'}`}>
                  {problem.difficultyLevel.charAt(0).toUpperCase() + problem.difficultyLevel.slice(1)}
                </td>
                <td className="p-4 border border-gray-300">
                  {problem.tags.length > 0 ? problem.tags.map(tag => tag.name).join(', ') : 'N/A'}
                </td>
                <td className="p-4 border border-gray-300">
                  <Link
                    to={`/problem/${problem._id}`}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Solve
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">No problems found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemPage;
