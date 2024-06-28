import { useNavigate } from "react-router-dom";

const NotFound = () => {
  document.title = "Artify - Not found";
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-4 text-center px-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
