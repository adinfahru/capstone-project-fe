import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSession } from '../apiservice'; // Impor createSession dari apiservice

export default function CreateSession() {
  const { id_class, id_quiz } = useParams(); // Ambil id_class dan id_quiz dari parameter URL
  const [sessionName, setSessionName] = useState('');
  const [duration, setDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateSession = async (e) => {
    e.preventDefault();

    try {
      const sessionData = await createSession(sessionName, duration, id_quiz); // Buat session
      // Setelah session dibuat, arahkan ke halaman pembuatan pertanyaan
      navigate(`/guru/kelas/${id_class}/quiz/${id_quiz}/session/${sessionData.id}/create-question`);
    } catch (error) {
      setErrorMessage(error.message || "Failed to create session.");
    }
  };

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
            Create Session
          </h1>
        </div>
      </header>

      <main className="py-10 px-36">
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        <form onSubmit={handleCreateSession} className="space-y-6">
          <div>
            <label htmlFor="sessionName" className="block text-sm font-medium text-gray-700">
              Session Name
            </label>
            <input
              type="text"
              id="sessionName"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Create Session
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
