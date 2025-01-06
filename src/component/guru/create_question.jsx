import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addQuestion } from '../apiservice'; // Pastikan ada API untuk menambahkan soal

export default function CreateQuestion() {
  const { id_class, id_quiz, id_session } = useParams(); // Ambil id_class, id_quiz, dan id_session dari parameter URL
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([{ option: '', isCorrect: false }, { option: '', isCorrect: false }, { option: '', isCorrect: false }, { option: '', isCorrect: false }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index].option = e.target.value;
    setOptions(newOptions);
  };

  const handleCorrectChange = (index) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = !newOptions[index].isCorrect;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi agar tidak ada opsi yang kosong
    const validOptions = options.filter(option => option.option.trim() !== ''); // Menghapus opsi kosong
  
    if (validOptions.length < 2) {
      setErrorMessage('Please provide at least two options.');
      return;
    }
  
    // Ubah 'option' menjadi 'text' pada setiap item opsi
    const formattedOptions = validOptions.map(option => ({
      text: option.option,  // Ganti 'option' menjadi 'text'
      isCorrect: option.isCorrect
    }));
  
    try {
      // Kirim soal beserta opsi yang sudah diformat
      await addQuestion(questionText, id_session, formattedOptions);
      setSuccessMessage('Question created successfully!');
      setErrorMessage(''); // Hapus error message setelah sukses
  
      // Reset form untuk soal dan opsi berikutnya
      setQuestionText('');
      setOptions([{ option: '', isCorrect: false }, { option: '', isCorrect: false }, { option: '', isCorrect: false }, { option: '', isCorrect: false }]);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create question.');
    }
  };

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <button
            onClick={() => window.history.back()} // Kembali ke halaman sebelumnya
            className="rounded-md bg-gray-800 text-white px-4 py-2 hover:bg-gray-700"
          >
            Back
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Question
          </h1>
        </div>
      </header>

      <main className="py-10 px-36">
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        {successMessage && <div className="text-green-600">{successMessage}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="questionText" className="block text-sm font-medium text-gray-700">
              Question Text
            </label>
            <textarea
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-4 mt-2">
                <input
                  type="text"
                  value={option.option}
                  onChange={(e) => handleOptionChange(index, e)}
                  placeholder={`Option ${index + 1}`}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={() => handleCorrectChange(index)}
                    className="mr-2"
                  />
                  Correct
                </label>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Create Question
            </button>
          </div>
        </form>

        {/* Optional message to indicate user can continue adding questions */}
        {successMessage && (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-600">You can continue adding more questions.</p>
          </div>
        )}
      </main>
    </div>
  );
}
