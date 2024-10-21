import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MySubmissionsPage = () => {
    const { userId, problemId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch submissions using fetch API
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/submit/submissions/${userId}/${problemId}`);

                if (!response.ok) {
                    throw new Error('Error fetching submissions');
                }

                const data = await response.json();
                setSubmissions(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching submissions');
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [userId, problemId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Submissions for User {userId} and Problem {problemId}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-violet-500 text-white text-left">
                            <th className="py-2 px-4 border-b">Language</th>
                            <th className="py-2 px-4 border-b">Result</th>
                            <th className="py-2 px-4 border-b">Submission Date</th>
                            <th className="py-2 px-4 border-b">Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission) => (
                            <tr
                                key={submission._id}
                                // Apply green or red row background based on result
                                className={`hover:bg-violet-200 ${
                                    submission.result === 'Success' ? 'bg-green-100' : 'bg-red-100'
                                }`}
                            >
                                <td className="py-2 px-4 border-b">{submission.language}</td>
                                <td className={`py-2 px-4 border-b font-bold ${submission.result === 'Success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {submission.result}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {new Date(submission.submissionDate).toLocaleString()}
                                </td>
                                
                                <td className="py-2 px-4 border-b">
                                    <details>
                                        <summary className="cursor-pointer text-blue-500 hover:underline">Show Code</summary>
                                        <pre className="bg-gray-100 p-2 mt-2 rounded max-w-full overflow-x-auto text-sm">
                                            <code>{submission.code}</code>
                                        </pre>
                                    </details>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySubmissionsPage;
