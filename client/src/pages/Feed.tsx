import React, { useEffect, useState } from 'react';
import api from '../api/axios';

interface Job {
    _id: string;
    title: string;
    organizationId: string;
    description: string;
    type: 'job' | 'volunteer';
    location: string;
    requirements: string[];
}

const Feed: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get('/jobs');
                setJobs(res.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <div className="text-center py-10">Loading jobs...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Opportunities</h2>
            <div className="grid gap-6 lg:grid-cols-2">
                {jobs.map((job) => (
                    <div key={job._id} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                        <div className="px-4 py-5 sm:px-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">{job.title}</h3>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.type === 'volunteer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                    {job.type === 'volunteer' ? 'Volunteer' : 'Job'}
                                </span>
                            </div>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{job.location}</p>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <p className="text-gray-700">{job.description}</p>
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900">Requirements:</h4>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {job.requirements.map((req, index) => (
                                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                            {req}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-4 sm:px-6">
                            <button className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
