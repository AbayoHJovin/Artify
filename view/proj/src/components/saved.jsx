import { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaEdit,
  FaHome,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function Saved() {
  document.title = "saved";
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    if (!token || !user) {
      navigate("/details");
    }
  }, []);
  useEffect(() => {
    fetch(
      `http://localhost:2024/all/?id=${
        JSON.parse(sessionStorage.getItem("user"))._id
      }`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const responseData = res.response;
        setData(responseData);
        setFiltered(responseData);
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
  function handleDelete(index, item) {
    fetch(`http://localhost:2024/delete/?id=${item._id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((resp) => {
        setFiltered((prev) => prev.filter((_, i) => i !== index));
        console.log(resp.message);
        toast.success(resp.message);
      })
      .catch((e) => console.error(e));
  }
  const handleClickOpen = (item) => {
    setOpen(true);
    setUpdateData(item);
    console.log(updateData);
  };
  const handleClose = () => setOpen(false);
  function handleUpdate() {
    const inputs = JSON.stringify({
      id: updateData._id,
      name: updateData.name,
      type: updateData.type,
      description: updateData.contents,
    });
    fetch("http://localhost:2024/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: inputs,
    })
      .then((resp) => resp.json())
      .then((data) => {
        location.reload();
        handleClose();
        console.log(data);
        toast.success(data.message);
      })
      .catch((e) => console.error(e));
  }
  useEffect(() => {
    const findSaved = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFiltered(findSaved);
    console.log(findSaved);
  }, [search]);

  return (
    <div className="p-4">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-lg font-bold">
          Update your data
        </DialogTitle>
        <DialogContent className="p-4">
          <div className="space-y-4">
            <label htmlFor="name" className="font-bold my-4">
              Name
            </label>
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              placeholder="Name"
              value={updateData.name}
              onChange={(e) =>
                setUpdateData({ ...updateData, name: e.target.value })
              }
            />
            <label htmlFor="name" className="font-bold my-4">
              Type
            </label>
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              placeholder="Enter type"
              value={updateData.type}
              onChange={(e) =>
                setUpdateData({ ...updateData, type: e.target.value })
              }
            />
            <label htmlFor="name" className="font-bold my-4">
              Contents
            </label>
            <textarea
              className="border rounded-md p-2 w-full resize-y"
              placeholder="Enter the contents"
              value={updateData.contents}
              onChange={(e) =>
                setUpdateData({ ...updateData, contents: e.target.value })
              }
            ></textarea>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-end space-x-4 p-4">
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            autoFocus
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </DialogActions>
      </Dialog>

      <div className="bg-gray-100 p-5 mb-10 flex justify-between sticky top-0 z-10 items-center">
        <h1 className="text-2xl font-bold mb-4">Your data:</h1>
        <FaHome
          size={30}
          onClick={() => navigate("/home")}
          className="cursor-pointer"
        />
      </div>
      <div className="sticky top-16 z-10 w-full max-w-md flex items-center justify-center mb-10">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          // onInput={handleSearch}
        />
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
        {filtered.length > 0 ? (
          filtered.map((datum, index) => (
            <div
              key={index}
              className={`bg-blue-500 text-white rounded-lg shadow-md p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
                expandedIndexes.includes(index)
                  ? "max-h-full overflow-auto"
                  : "max-h-[11rem] overflow-hidden"
              }`}
            >
              <div className="flex justify-end">
                <FaEdit
                  className="mx-2 cursor-pointer"
                  onClick={() => handleClickOpen(datum)}
                />
                <FaTrash
                  className="mx-2 cursor-pointer text-red-600"
                  onClick={() => handleDelete(index, datum)}
                />
              </div>
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
          <h1 className="text-xl">We can not find any data</h1>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
