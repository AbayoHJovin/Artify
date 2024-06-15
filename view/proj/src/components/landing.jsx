import Img from "./image.png";
import Data from "./comp.png";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Email from "./mail";
import { ReactTyped } from "react-typed";
import Footer from "./footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo.png";

export default function Landing() {
  document.title = "Artify-Landing";
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-blue-600 sticky top-0 z-10">
        <nav className="flex items-center justify-between p-4 md:px-10">
          <div className="text-gray-600 flex items-center">
            <img src={logo} alt="Logo" className="h-12 mr-[-20px] mt-2" />
            <p className="text-4xl font-extrabold text-white">rtify</p>
          </div>

          <div className="md:hidden">
            {isOpen ? (
              <AiOutlineClose
                onClick={handleToggle}
                className="cursor-pointer text-white"
              />
            ) : (
              <AiOutlineMenu
                onClick={handleToggle}
                className="cursor-pointer text-white"
              />
            )}
          </div>

          <div className="hidden md:flex space-x-6 text-white">
            <p
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/details")}
            >
              Login
            </p>
          </div>
        </nav>

        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <p
              className="p-4 text-blue-900 cursor-pointer hover:bg-gray-200"
              onClick={() => navigate("/details")}
            >
              Login
            </p>
          </div>
        )}
      </div>

      <div className="bg-[rgb(37,99,235)] text-white w-full">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left md:mr-8 mx-4 md:mx-24 mt-10">
            <div className="flex justify-center md:justify-start">
              <h1 className="font-mono text-3xl md:text-6xl mr-3">Hello</h1>
              <h1 className="font-mono text-3xl md:text-6xl mb-3 text-orange-400">
                <ReactTyped
                  strings={["Wise", "Talented", "Entertainment"]}
                  typeSpeed={120}
                  backSpeed={140}
                  loop
                />
              </h1>
            </div>
            <h1 className="font-mono text-3xl md:text-6xl mb-3">people</h1>
            <p className="mb-6 md:mb-0 md:w-[400px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              magnam delectus minima! Assumenda ut quibusdam voluptates totam!
              Nobis dolorem modi.
            </p>
            <button
              onClick={() => navigate("/details")}
              className="px-6 py-3 rounded-lg bg-[#f58d05] mt-4 hover:bg-white hover:text-blue-700 duration-300 font-bold"
            >
              Get Started
            </button>
          </div>
          <div className="md:w-1/2 mt-10 mx-4 md:mx-0">
            <img src={Img} alt="image" className="mx-auto" />
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#bbbec3"
            fillOpacity="1"
            d="M0,256L120,266.7C240,277,480,299,720,298.7C960,299,1200,277,1320,266.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="flex flex-col xl:flex-row items-center px-4 md:px-20 py-10">
        <img src={Data} alt="mine" className="md:mr-4 mx-auto md:mx-0" />
        <div className="md:ml-10 ml-0 md:mb-4 mb-10 text-center md:text-left">
          <h1 className="md:text-5xl text-3xl font-bold pb-4 text-black">
            Manage Data Centrally
          </h1>
          <p className="md:w-[600px] w-full text-black pb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            consequuntur, accusamus dignissimos quisquam obcaecati repudiandae
            corrupti cupiditate laboriosam eum, reprehenderit quasi voluptate
            praesentium vel.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg w-[200px] mx-auto md:mx-0">
            Learn more
          </button>
        </div>
      </div>

      <Email />
      <Footer />
    </div>
  );
}
