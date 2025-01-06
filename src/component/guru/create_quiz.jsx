import React, { useState, useEffect } from "react";
import { createQuiz } from "../apiservice";
import { useParams, useNavigate } from "react-router-dom";  // Digunakan untuk mengambil ID kelas dari URL

export default function CreateQuiz() {
  const { id_class } = useParams();  // Mengambil id_class dari URL
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    is_published: false,
    randomize_questions: true,
    show_result: true,
    show_answers: false,
    start_date: "",
    end_date: "",
    classes: [],  // Menambahkan array kelas
  });

  useEffect(() => {
    if (id_class) {
      // Menambahkan id_class ke dalam array classes jika ada
      setQuizData((prevData) => ({
        ...prevData,
        classes: [...prevData.classes, id_class],
      }));
    }
  }, [id_class]);

  const handleCreateQuiz = async () => {
    try {
      const uniqueClasses = [...new Set(quizData.classes)];

      // Menambahkan kelas unik ke dalam payload
      const payload = {
        ...quizData,
        classes: uniqueClasses,
      };

      const response = await createQuiz(payload); // Membuat quiz
      alert("Quiz created successfully!");
      navigate(`/guru/kelas/${id_class}`)
      
    } catch (error) {
      console.error(error.message || "Failed to create quiz.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Quiz for Class</h1>

      {/* Form untuk mengisi quiz */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={quizData.title}
          onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={quizData.description}
          onChange={(e) => setQuizData({ ...quizData, description: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Start Date</label>
        <input
          type="datetime-local"
          value={quizData.start_date}
          onChange={(e) => setQuizData({ ...quizData, start_date: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">End Date</label>
        <input
          type="datetime-local"
          value={quizData.end_date}
          onChange={(e) => setQuizData({ ...quizData, end_date: e.target.value })}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {/* Pilihan radio untuk is_published */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Publish Quiz</label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="is_published"
              checked={quizData.is_published === true}
              onChange={() => setQuizData({ ...quizData, is_published: true })}
              className="mr-2"
            />
            Yes
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="is_published"
              checked={quizData.is_published === false}
              onChange={() => setQuizData({ ...quizData, is_published: false })}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      {/* Pilihan radio untuk randomize_questions */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Randomize Questions</label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="randomize_questions"
              checked={quizData.randomize_questions === true}
              onChange={() => setQuizData({ ...quizData, randomize_questions: true })}
              className="mr-2"
            />
            Yes
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="randomize_questions"
              checked={quizData.randomize_questions === false}
              onChange={() => setQuizData({ ...quizData, randomize_questions: false })}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      {/* Pilihan radio untuk show_result */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Show Results</label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="show_result"
              checked={quizData.show_result === true}
              onChange={() => setQuizData({ ...quizData, show_result: true })}
              className="mr-2"
            />
            Yes
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="show_result"
              checked={quizData.show_result === false}
              onChange={() => setQuizData({ ...quizData, show_result: false })}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      {/* Pilihan radio untuk show_answers */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Show Answers</label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="show_answers"
              checked={quizData.show_answers === true}
              onChange={() => setQuizData({ ...quizData, show_answers: true })}
              className="mr-2"
            />
            Yes
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="show_answers"
              checked={quizData.show_answers === false}
              onChange={() => setQuizData({ ...quizData, show_answers: false })}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      <button
        onClick={handleCreateQuiz}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Create Quiz
      </button>
      </div>
  );
}
