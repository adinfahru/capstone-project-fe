import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/";

export async function deleteQuiz(quizId) {
  const token = localStorage.getItem("tokens"); // Ambil token dari localStorage
  try {
    const response = await axios.delete(
      `${BASE_URL}api/quizzes/${quizId}/`, // Endpoint untuk menghapus kelas
      {
        headers: {
          Authorization: `Bearer ${token}`, // Tambahkan Authorization header
        },
      }
    );
    return response.data; // Kembalikan response jika dibutuhkan
  } catch (error) {
    console.error("Error deleting class:", error.response?.data || error.message);
    throw error.response?.data || "Failed to delete class.";
  }
}

export async function deleteClass(id_class) {
  const token = localStorage.getItem("tokens"); // Ambil token dari localStorage
  try {
    const response = await axios.delete(
      `${BASE_URL}api/classes/${id_class}/`, // Endpoint untuk menghapus kelas
      {
        headers: {
          Authorization: `Bearer ${token}`, // Tambahkan Authorization header
        },
      }
    );
    return response.data; // Kembalikan response jika dibutuhkan
  } catch (error) {
    console.error("Error deleting class:", error.response?.data || error.message);
    throw error.response?.data || "Failed to delete class.";
  }
}

export async function updateClass(id_class, classData) {
  const token = localStorage.getItem("tokens"); // Ambil token dari localStorage
  try {
      const response = await axios.put(
          `${BASE_URL}api/classes/${id_class}/`, 
          {
            name: classData.name,  // Kirimkan name secara langsung
            subject: classData.subject  // Kirimkan subject secara langsung
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Menambahkan Authorization header
                  "Content-Type": "application/json", // Pastikan tipe konten adalah JSON
              }
          }
      );
      return response.data;
  } catch (error) {
      console.error('Error updating class:', error.response?.data || error.message);
  }
}


export const getQuestionsBySession = async (sessionId) => {
  const token = localStorage.getItem("tokens");

  try {
    const response = await axios.get(`${BASE_URL}api/sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to fetch questions");
  }
};

export const getQuizWithSessions = async (quizId) => {
  const token = localStorage.getItem("tokens");

  try {
    const response = await axios.get(`${BASE_URL}api/quizzes/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;  // Response ini berisi quiz dan sesi
  } catch (error) {
    console.error("Error fetching quiz:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to fetch quiz details");
  }
};

export const getQuizzesByClass = async (id_class) => {
  const token = localStorage.getItem("tokens");

  try {
    const response = await axios.get(
      `${BASE_URL}api/classes/${id_class}/quizzes/`, // Ganti dengan endpoint yang sesuai untuk quiz di kelas
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in getQuizzesByClass:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to fetch quizzes");
  }
};

export const createClass = async (name, subject) => {
  const token = localStorage.getItem("tokens");

  try {
    const response = await axios.post(
      `${BASE_URL}api/classes/`, // Pastikan endpoint di sini benar
      { name, subject },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in createClass:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to create class");
  }
};

export const gabungkelas = async (code) => {
  try {
    // Ambil token dari localStorage
    const token = localStorage.getItem("tokens"); // Pastikan di-parse karena disimpan sebagai JSON string

    // Kirim request POST
    const response = await axios.post(
      `${BASE_URL}api/student/join-class/`,
      { code }, // Body request
      {
        headers: {
          Authorization: `Bearer ${token}`, // Header Authorization
          "Content-Type": "application/json"
        },
      }
    );

    // Kembalikan data dari response jika berhasil
    return response.data;
  } catch (error) {
    // Tangani error
    if (error.response) {
      throw error.response.data; // Mengembalikan error dari backend
    } else {
      throw new Error("Error saat menghubungi server.");
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}api/accounts/login/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data; // Mengembalikan pesan error dari backend
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}api/accounts/register/`, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getKelas = async () => {
  const token = localStorage.getItem("tokens");
  try {
    const response = await axios.get(`${BASE_URL}api/classes/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Header Authorization
        "Content-Type": "application/json"
      },
    });
    return response.data
  } catch (error) {
    throw error.response.data
  }
};

export const getKelasSiswa = async () => {
  const token = localStorage.getItem("tokens");
  try {
    const response = await axios.get(`${BASE_URL}api/student/enrolled-classes/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Header Authorization
        "Content-Type": "application/json"
      },
    });
    return response.data
  } catch (error) {
    throw error.response.data
  }
};

export const getClassDetail = async (id_class) => {
  const token = localStorage.getItem("tokens");

  try {
    const response = await axios.get(`${BASE_URL}api/classes/${id_class}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getClassDetail:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to fetch class details");
  }
};

// quiz
export const createQuiz = async (quizData) => {
  const token = localStorage.getItem("tokens");

  try {
    const response = await axios.post(
      `${BASE_URL}api/quizzes/`, // Endpoint untuk membuat quiz
      quizData, // Mengirimkan seluruh payload quiz
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in createQuiz:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to create quiz");
  }
};


export const createSession = async (name, duration, id) => {
  const token = localStorage.getItem("tokens");
  try {
    const response = await axios.post(
      `${BASE_URL}api/sessions/`,
      { name, duration, quiz: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create session.";
  }
};

export const addQuestion = async (text, sessionId, options) => {
  const token = localStorage.getItem("tokens");
  try {
    const response = await axios.post(
      `${BASE_URL}api/questions/`,
      { text, session: sessionId, options },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to add question.";
  }
};

export const publishQuiz = async (quizId) => {
  const token = localStorage.getItem("tokens");
  try {
    const response = await axios.post(
      `${BASE_URL}api/quizzes/${quizId}/publish/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to publish quiz.";
  }
};
