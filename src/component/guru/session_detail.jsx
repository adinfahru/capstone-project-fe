import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsBySession } from '../apiservice'; // Tambahkan fungsi API

export default function SessionDetail() {
    const { sessionId, id_class, id_quiz } = useParams(); // Ambil sessionId, id_class, dan id_quiz dari URL
    const [sessionDetail, setSessionDetail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessionDetail = async () => {
            try {
                const data = await getQuestionsBySession(sessionId); // Panggil API untuk mendapatkan detail sesi
                setSessionDetail(data); // Simpan data ke state
            } catch (error) {
                setErrorMessage(error.message || 'Failed to fetch session details');
            }
        };

        fetchSessionDetail(); // Panggil API saat komponen dimuat
    }, [sessionId]);

    return (
        <div className="min-h-full">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
                        className="rounded-md bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
                    >
                        Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Session Detail
                    </h1>
                </div>
            </header>

            <main className="py-10 px-36">
                {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                {!sessionDetail && !errorMessage && <div>Loading...</div>}
                {sessionDetail && (
                    <div className="space-y-6">
                        {/* Session Info */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">{sessionDetail.name}</h2>
                            <p><strong>Duration:</strong> {sessionDetail.duration} minutes</p>
                            <p><strong>Order:</strong> {sessionDetail.order}</p>
                        </div>

                        {/* Tombol Add Question */}
                        <div className="flex justify-end">
                            <button
                                onClick={() =>
                                    navigate(
                                        `/guru/kelas/${id_class}/quiz/${id_quiz}/session/${sessionId}/create-question`
                                    )
                                } // Navigasi ke halaman tambah soal
                                className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                            >
                                Add Question
                            </button>
                        </div>

                        {/* Questions List */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">Questions</h3>
                            {sessionDetail.questions.length > 0 ? (
                                sessionDetail.questions.map((question, index) => (
                                    <div key={question.id} className="mb-6">
                                        <h4 className="text-lg font-semibold">{index + 1}. {question.text}</h4>
                                        <ul className="mt-2">
                                            {question.options.map((option) => (
                                                <li
                                                    key={option.id}
                                                    className={`px-4 py-2 rounded ${
                                                        option.is_correct ? 'bg-green-100' : 'bg-gray-100'
                                                    }`}
                                                >
                                                    {option.text} {option.is_correct && '(Correct)'}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p>No questions available for this session.</p>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
