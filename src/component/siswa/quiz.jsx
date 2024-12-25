import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const soalData = [
  {
    id: 1,
    soal: "Apa ibu kota Indonesia?",
    pilihan: ["Jakarta", "Bandung", "Surabaya", "Medan"],
    jawaban: "Jakarta",
    level: "medium",
  },
  {
    id: 2,
    soal: "Apa warna langit saat cerah?",
    pilihan: ["Merah", "Biru", "Hijau", "Kuning"],
    jawaban: "Biru",
    level: "easy",
  },
  {
    id: 3,
    soal: "Siapa penemu hukum gravitasi?",
    pilihan: ["Einstein", "Newton", "Tesla", "Galileo"],
    jawaban: "Newton",
    level: "hard",
  },
];

export default function PengerjaanSoal() {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [soalIndex, setSoalIndex] = useState(0);
  const [jawabanPerSoal, setJawabanPerSoal] = useState(
    new Array(soalData.length).fill("")
  );
  const [isFinished, setIsFinished] = useState(false);
  const [waktu, setWaktu] = useState(600); // Waktu pengerjaan 10 menit
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [soalStatus, setSoalStatus] = useState(
    new Array(soalData.length).fill(false)
  );
  const [showPopup, setShowPopup] = useState(false); // State untuk kontrol popup

  useEffect(() => {
    let timer;
    if (waktu > 0 && !isFinished) {
      timer = setInterval(() => {
        setWaktu((prevWaktu) => prevWaktu - 1);
      }, 1000);
    } else if (waktu === 0) {
      setIsFinished(true);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [waktu, isFinished]);

  const handleSubmit = () => {
    setShowPopup(true); // Tampilkan popup konfirmasi
  };

  const handleConfirmSubmit = () => {
    soalData.forEach((soal, index) => {
      if (jawabanPerSoal[index] === soal.jawaban) {
        setCorrectAnswers((prev) => prev + 1);
      }
      setSoalStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[index] = true;
        return newStatus;
      });
    });
    setIsFinished(true);
    setShowPopup(false); // Tutup popup
  };

  const handleCancelSubmit = () => {
    setShowPopup(false); // Tutup popup tanpa submit
  };

  const handlePrev = () => {
    if (soalIndex > 0) {
      setSoalIndex(soalIndex - 1);
    }
  };

  const handleNext = () => {
    if (soalIndex < soalData.length - 1) {
      setSoalIndex(soalIndex + 1);
    }
  };

  const handleChangeJawaban = (event) => {
    const updatedJawabanPerSoal = [...jawabanPerSoal];
    updatedJawabanPerSoal[soalIndex] = event.target.value;
    setJawabanPerSoal(updatedJawabanPerSoal);
  };

  const handleBackToDashboard = () => {
    navigate("/siswa"); // Navigasi kembali ke halaman dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg flex">
        {/* Panel Soal (Grid) */}
        <div className="w-1/4 p-4 bg-gray-200 rounded-md mr-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Nomor Soal</h3>
            {/* Waktu */}
            <div className="text-lg font-semibold">
              Waktu: {Math.floor(waktu / 60)}:{waktu % 60}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-4">
            {soalData.map((soal, index) => (
              <div
                key={soal.id}
                className={`p-2 text-center cursor-pointer rounded-md ${
                  jawabanPerSoal[index] !== "" // Jika sudah dijawab, beri warna
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
                onClick={() => setSoalIndex(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Panel Soal (Soal dan Pilihan Ganda) */}
        <div className="w-3/4">
          <h2 className="text-2xl font-bold text-center mb-4">Pengerjaan Soal</h2>

          {isFinished ? (
            <div className="text-center">
              <h3 className="text-lg font-semibold">Kuis Selesai!</h3>
              <p className="text-gray-600">
                Jawaban Benar: {correctAnswers} dari {soalData.length}
              </p>
              {/* Tombol Kembali ke Dashboard */}
              <Button onClick={handleBackToDashboard} color="gray" className="mt-4 px-auto py-2">
                Kembali ke Dashboard
              </Button>
            </div>
          ) : (
            <div>
              <div className="text-lg mb-4">
                <p>
                  <strong>Soal {soalIndex + 1}:</strong> {soalData[soalIndex].soal}
                </p>
              </div>

              <div className="mb-4">
                {soalData[soalIndex].pilihan.map((pilihan, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="jawaban"
                      value={pilihan}
                      checked={jawabanPerSoal[soalIndex] === pilihan}
                      onChange={handleChangeJawaban}
                      className="mr-2"
                    />
                    <label htmlFor={`option-${index}`} className="text-gray-800">
                      {pilihan}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button onClick={handlePrev} color="gray" className="px-auto py-2" disabled={soalIndex === 0}>
                  Previous
                </Button>
                {soalIndex === soalData.length - 1 ? (
                  <Button onClick={handleSubmit} className="px-auto py-2 bg-green-600">
                    Submit
                  </Button>
                ) : (
                  <Button onClick={handleNext} color="gray" className="px-auto py-2" disabled={soalIndex === soalData.length - 1}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup Konfirmasi */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Apakah Anda yakin sudah mengerjakan semua soal?</h3>
            <div className="mt-4 flex justify-between">
              <Button onClick={handleConfirmSubmit} color="green" className="px-auto py-2">Ya, Submit</Button>
              <Button onClick={handleCancelSubmit} className="px-auto py-2 bg-red-600" >Tidak, Kembali</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
