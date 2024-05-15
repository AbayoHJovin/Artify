import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Saved() {
  const [data, setData] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2024/all")
      .then((response) => response.json())
      .then((res) => {
        const responseData = res.response;
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function handleView(index) {
    setExpandedIndexes((prevState) =>
      prevState.includes(index)
        ? prevState.filter((item) => item !== index)
        : [...prevState, index]
    );
  }

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-5 mb-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Your data:</h1>
        <FaHome
          size={30}
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
        {data.length > 0 ? (
          data.map((datum, index) => (
            <div
              key={index}
              className={`bg-blue-500 text-white rounded-lg shadow-md p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
                expandedIndexes.includes(index)
                  ? "max-h-full overflow-auto"
                  : "max-h-[10rem] overflow-hidden"
              }`}
            >
              <h2 className="text-2xl mb-2 font-extrabold">{datum.name}</h2>
              <p className=" mb-2">
                <b>Type:</b> {datum.type}
              </p>
              <p
                className={` ${
                  expandedIndexes.includes(index)
                    ? "max-w-full whitespace-normal"
                    : "w-[20rem] truncate"
                }`}
              >
                <b className="text-2xl"> Contents: </b>
                {datum.contents}
              </p>

              {expandedIndexes.includes(index) ? (
                <FaAngleUp
                  onClick={() => handleView(index)}
                  className="font-bold my-4 cursor-pointer transition-all duration-500"
                />
              ) : (
                <FaAngleDown
                  onClick={() => handleView(index)}
                  className="font-bold my-4 cursor-pointer transition-all duration-500"
                />
              )}
            </div>
          ))
        ) : (
          <h1 className="text-xl">No data</h1>
        )}
      </div>
    </div>
  );
}
