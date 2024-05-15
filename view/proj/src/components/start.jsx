import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MediaForm = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [response, setresponse] = useState("");
  const [saved, setSaved] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { title, type, description });
    fetch("http://localhost:2024/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        type: type,
        description: description,
      }),
    })
      .then((data) => data.json())
      .then((resp) => {
        setresponse(resp.message);
      });
  };
  useEffect(() => {
    fetch("http://localhost:2024/all")
      .then((response) => response.json())
      .then((res) => {
        const responseData = res.response;
        setSaved(responseData.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div
        className="float-right m-10 cursor-pointer text-blue-500"
        onClick={() => navigate("/saved")}
      >
        <FaSave size={20} />
        <h1 className="font-bold">{saved} Saved</h1>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl text-blue-600 font-bold">{response}</h1>
        <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">
            Hello media and entertainment enthusiast
          </h1>
          <p className="mb-4">
            Here you can put some of your songs, movies, or any other form of
            entertainment, and we will help you save them in the database for
            future use.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter the name of your art"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                placeholder="type of entertainment. eg:song"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Contents
              </label>
              <textarea
                id="description"
                placeholder="Enter all you think"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MediaForm;
