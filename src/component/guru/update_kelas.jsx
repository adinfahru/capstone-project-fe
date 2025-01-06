import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateClass } from '../apiservice';

export default function UpdateClass() {
    const { id_class } = useParams(); // Gunakan id_class sebagai parameter
    const [classData, setClassData] = useState({
        name: '',
        subject: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClassDetail = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/classes/${id_class}/`);
                setClassData({
                    name: response.data.name,
                    subject: response.data.subject
                });
            } catch (error) {
                setErrorMessage('Failed to fetch class details');
            }
        };

        fetchClassDetail();
    }, [id_class]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateClass(id_class, classData); // Menggunakan service yang sudah diperbaiki
            navigate(`/guru/kelas/${id_class}`);  // Kembali ke halaman detail setelah update berhasil
        } catch (error) {
            setErrorMessage('Failed to update class');
        }
    };

    return (
        <div className="min-h-full">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <button
                        onClick={() => navigate(`/guru/kelas/${id_class}`)} // Kembali ke halaman kelas detail
                        className="rounded-md bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
                    >
                        Back to Class Detail
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Update Class
                    </h1>
                </div>
            </header>

            <main className="py-10 px-36">
                {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Class Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={classData.name}
                                onChange={(e) => setClassData({ ...classData, name: e.target.value })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                Subject
                            </label>
                            <textarea
                                id="subject"
                                name="subject"
                                value={classData.subject}
                                onChange={(e) => setClassData({ ...classData, subject: e.target.value })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Update Class
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
