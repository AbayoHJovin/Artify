import {
  FaLinkedin,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full mx-auto mt-8">
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center content-center">
          <p className="text-sm">&copy; 2024 Artify. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-3 justify-center">
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebookSquare size={30} className="cursor-pointer" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram size={30} className="cursor-pointer" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTwitterSquare size={30} className="cursor-pointer" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaGithubSquare size={30} className="cursor-pointer" />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaLinkedin size={30} className="cursor-pointer" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
