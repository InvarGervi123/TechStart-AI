import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<any>(null);
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [generatedBio, setGeneratedBio] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const res = await api.get(`/users/${user.uid}`);
                    setProfile(res.data);
                    setBio(res.data.bio || '');
                    setSkills(res.data.skills?.join(', ') || '');
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const handleGenerateBio = async () => {
        setLoading(true);
        try {
            const res = await api.post('/ai/generate-profile', {
                skills: skills.split(',').map(s => s.trim()),
                bio: bio
            });
            setGeneratedBio(res.data.description);
        } catch (error) {
            console.error('Error generating bio:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            await api.post('/users/sync', {
                firebaseUid: user?.uid,
                bio: generatedBio || bio,
                skills: skills.split(',').map(s => s.trim())
            });
            alert('Profile updated!');
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                                Skills (comma separated)
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="skills"
                                    id="skills"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    placeholder="React, Node.js, TypeScript"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                About
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                    placeholder="Brief description about yourself"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <button
                                type="button"
                                onClick={handleGenerateBio}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                {loading ? 'Generating...' : '✨ Improve with AI'}
                            </button>
                        </div>

                        {generatedBio && (
                            <div className="sm:col-span-6 bg-purple-50 p-4 rounded-md">
                                <h4 className="text-sm font-medium text-purple-800">AI Suggestion:</h4>
                                <p className="mt-2 text-sm text-purple-900">{generatedBio}</p>
                                <button
                                    type="button"
                                    onClick={() => setBio(generatedBio)}
                                    className="mt-2 text-xs text-purple-700 hover:text-purple-900 underline"
                                >
                                    Use this description
                                </button>
                            </div>
                        )}

                        <div className="sm:col-span-6 text-right">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
