import { useQuiz } from "../Context/QuizContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { name, setName } = useQuiz();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return alert('Enter your name');
    navigate('/Select');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0A192F] to-[#112240] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1C2541] p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-[#324766] transition-transform transform hover:scale-105"
      >
        <h1 className="text-3xl font-bold text-center text-white">
          🎉 Welcome to Trivia Battle!
        </h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-[#324766] rounded-md bg-[#0F172A] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 transform hover:scale-105"
        >
          Start Game
        </button>
      </form>
    </div>
  );
}

export default Home;