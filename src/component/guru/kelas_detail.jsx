import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClassDetail, getQuizzesByClass } from '../apiservice'; // Tambahkan getQuizzesByClass

export default function KelasDetail_Guru() {
    const { id_class } = useParams(); // Ambil id_class dari parameter URL
    const [kelasDetail, setKelasDetail] = useState(null);
    const [quizzes, setQuizzes] = useState([]); // State untuk menyimpan quiz
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Hook untuk navigasi

    useEffect(() => {
        const fetchKelasDetail = async () => {
            try {
                const data = await getClassDetail(id_class); // Panggil fungsi API untuk detail kelas
                setKelasDetail(data); // Simpan data ke state kelas
            } catch (error) {
                setErrorMessage(error.message || "Failed to fetch class details");
            }
        };

        const fetchQuizzes = async () => {
            try {
                const quizData = await getQuizzesByClass(id_class); // Panggil fungsi API untuk quiz
                setQuizzes(quizData); // Simpan data quiz ke state
            } catch (error) {
                setErrorMessage(error.message || "Failed to fetch quizzes");
            }
        };

        fetchKelasDetail(); // Jalankan fungsi fetchKelasDetail
        fetchQuizzes(); // Jalankan fungsi fetchQuizzes
    }, [id_class]);

    return (
        <div className="min-h-full">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)} // Navigasi ke halaman sebelumnya
                        className="rounded-md bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
                    >
                        Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Detail Kelas
                    </h1>
                </div>
            </header>

            <main className="py-10 px-36">
                {errorMessage && <div className="text-red-600">{errorMessage}</div>}
                {!kelasDetail && !errorMessage && <div>Loading...</div>}
                {kelasDetail && (
                    <div>
                        {/* Kelas Details */}
                        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Class Information</h2>
                            <p><strong>Subject:</strong> {kelasDetail.subject}</p>
                            <p><strong>Code:</strong> {kelasDetail.code}</p>
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold">Teacher</h3>
                                <p>{kelasDetail.teacher.full_name}</p>
                                <p>Email: {kelasDetail.teacher.email}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold">Students</h3>
                                <ul>
                                    {kelasDetail.students.map((student) => (
                                        <li key={student.id}>
                                            {student.full_name} - {student.email}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mt-4">
                                <strong>Created At:</strong> {new Date(kelasDetail.created_at).toLocaleString()}
                            </p>
                        </div>

                        {/* Divider with Button - Pindah ke sini */}
                        <div className="relative flex items-center py-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <button
                                className="relative z-10 mx-4 rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                                onClick={() => navigate(`/guru/kelas/${id_class}/add-quiz`)}
                            >
                                Add Task/Quiz
                            </button>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Quiz List */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold mb-4">Quizzes</h3>
                            {quizzes.length > 0 ? (
                                quizzes.map((quiz) => (
                                    <div key={quiz.id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                                        <h4 className="text-xl font-semibold mb-4">{quiz.title}</h4>
                                        <p>{quiz.description}</p>
                                        <p>
                                            <strong>Start:</strong> {new Date(quiz.start_date).toLocaleString()}
                                            <br />
                                            <strong>End:</strong> {new Date(quiz.end_date).toLocaleString()}
                                        </p>
                                        {/* Tombol Create Session */}
                                        <button
                                            className="mt-4 rounded-md bg-green-600 text-white px-4 py-2 hover:bg-green-700"
                                            onClick={() => navigate(`/guru/kelas/${id_class}/quiz/${quiz.id}/create-session`)}
                                        >
                                            Create Session
                                        </button>
                                        {/* Tombol View Quiz Detail */}
                                        <button
                                            className="mt-4 rounded-md bg-yellow-600 text-white px-4 py-2 hover:bg-yellow-700"
                                            onClick={() => navigate(`/guru/kelas/${id_class}/quiz/${quiz.id}`)} // Navigasi ke quiz detail
                                        >
                                            View Quiz Detail
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                                    <p>No quizzes available for this class.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
