import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassDetail, getQuizzesByClass, updateClass, deleteClass, deleteQuiz } from "../apiservice"; // Tambahkan deleteClass

export default function KelasDetail_Guru() {
    const { id_class } = useParams(); // Ambil id_class dari parameter URL
    const [kelasDetail, setKelasDetail] = useState(null);
    const [quizzes, setQuizzes] = useState([]); // State untuk menyimpan quiz
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // Hook untuk navigasi
    const [isEditing, setIsEditing] = useState(false); // State untuk mengatur mode edit
    const [className, setClassName] = useState(""); // Untuk input nama kelas
    const [classSubject, setClassSubject] = useState(""); // Untuk input mata pelajaran

    useEffect(() => {
        const fetchKelasDetail = async () => {
            try {
                const data = await getClassDetail(id_class); // Panggil fungsi API untuk detail kelas
                setKelasDetail(data); // Simpan data ke state kelas
                setClassName(data.name); // Set nama kelas untuk input
                setClassSubject(data.subject); // Set mata pelajaran untuk input
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

    const handleUpdateClass = async () => {
        try {
            await updateClass(id_class, className, classSubject); // Panggil fungsi API untuk update kelas
            setIsEditing(false); // Setelah update, matikan mode edit
        } catch (error) {
            setErrorMessage(error.message || "Failed to update class");
        }
    };

    const handleDeleteClass = async () => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            try {
                await deleteClass(id_class); // Panggil fungsi API untuk menghapus kelas
                alert("Class deleted successfully.");
                navigate("/guru/kelas"); // Kembali ke halaman daftar kelas
            } catch (error) {
                setErrorMessage(error.message || "Failed to delete class.");
            }
        }
    };

    const handleDeleteQuiz = async (quizId) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            try {
                await deleteQuiz(quizId); // Panggil fungsi API untuk menghapus quiz
                setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId)); // Hapus quiz dari state
                alert("Quiz deleted successfully.");
            } catch (error) {
                setErrorMessage(error.message || "Failed to delete quiz.");
            }
        }
    };

    return (
        <div className="min-h-full">
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
                    <button
                        onClick={() => navigate("/guru/kelas")} // Navigasi ke halaman sebelumnya
                        className="rounded-md bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
                    >
                        Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Detail Kelas</h1>
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
                            {/* Tampilkan detail kelas */}
                            {isEditing ? (
                                <div>
                                    <input
                                        type="text"
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                        className="border p-2 mb-2"
                                        placeholder="Class Name"
                                    />
                                    <input
                                        type="text"
                                        value={classSubject}
                                        onChange={(e) => setClassSubject(e.target.value)}
                                        className="border p-2"
                                        placeholder="Subject"
                                    />
                                    <button
                                        onClick={handleUpdateClass}
                                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="ml-2 mt-4 bg-gray-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p><strong>Subject:</strong> {kelasDetail.subject}</p>
                                    <p><strong>Code:</strong> {kelasDetail.code}</p>
                                    <div className="mt-4">
                                        <h3 className="text-xl font-semibold">Teacher</h3>
                                        <p>{kelasDetail.teacher.full_name}</p>
                                        <p>Email: {kelasDetail.teacher.email}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/guru/kelas/${id_class}/update`)} // Arahkan ke halaman update menggunakan id_class
                                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Update Class
                                    </button>
                                    <button
                                        onClick={handleDeleteClass}
                                        className="w-full py-2 px-4 mt-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        Delete Class
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Divider with Button */}
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
                                        <button
                                            className="mt-4 rounded-md bg-yellow-600 text-white px-4 py-2 hover:bg-yellow-700"
                                            onClick={() => navigate(`/guru/kelas/${id_class}/quiz/${quiz.id}`)}
                                        >
                                            View Quiz Detail
                                        </button>
                                        <button
                                            className="mt-4 rounded-md bg-red-600 text-white px-4 py-2 hover:bg-red-700"
                                            onClick={() => handleDeleteQuiz(quiz.id)}
                                        >
                                            Delete Quiz
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
