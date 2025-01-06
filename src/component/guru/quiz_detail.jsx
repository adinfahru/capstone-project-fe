import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizWithSessions } from '../apiservice'; // API untuk mengambil quiz beserta sesi

export default function QuizDetail() {
  const {id_class} = useParams();  
  const { quizId } = useParams(); // Ambil quizId dari parameter URL
  const [quizData, setQuizData] = useState(null);  // Menyimpan data quiz termasuk sesi
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizWithSessions(quizId); // Ambil quiz dengan sesi
        setQuizData(data); // Simpan data quiz ke state
      } catch (error) {
        setErrorMessage("Failed to fetch quiz details.");
      }
    };

    fetchQuiz(); // Ambil quiz saat komponen dimuat
  }, [quizId]);

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
            Detail Quiz
          </h1>
        </div>
      </header>

      <main className="py-10 px-36">
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        {!quizData && !errorMessage && <div>Loading...</div>}

        {quizData && (
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">{quizData.title}</h2>
              <p><strong>Description:</strong> {quizData.description}</p>
              <p><strong>Start:</strong> {new Date(quizData.start_date).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(quizData.end_date).toLocaleString()}</p>
              <p><strong>Total Duration:</strong> {quizData.total_duration} minutes</p>
            </div>

            {/* Display Sessions for the Quiz */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Sessions</h3>
              {quizData.sessions && quizData.sessions.length > 0 ? (
                <ul>
                  {quizData.sessions.map((session) => (
                    <li key={session.id} className="mb-4">
                      <h4 className="text-lg font-bold">{session.name}</h4>
                      <p><strong>Duration:</strong> {session.duration} minutes</p>
                      <button
                        onClick={() => navigate(`/guru/kelas/${id_class}/session/${session.id}/questions`)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        View Questions
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No sessions available for this quiz.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
