export default function Email() {
    return (
        <div className="bg-gray-200 md:w-[1400px] w-full md:ml-[50px] ml-[25px] p-8 md:p-24 rounded-lg hover:scale-105 duration-300 mx-auto">
        <div className="md:flex items-center">
          <div className="mb-4 md:mb-0 md:w-1/2">
            <h1 className="md:text-4xl text-3xl font-bold mb-2">
              Want to work with us?
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore,
              possimus.
            </p>
          </div>
          <div className="md:ml-[200px] w-full md:w-auto">
            <input
              type="email"
              className="p-4 w-full md:w-[400px] rounded-lg"
              placeholder="Enter Email"
            />
            <button className="bg-blue-900 hover:bg-blue-800 p-3 w-full md:w-[200px] rounded-lg text-white mt-6 md:mt-0 md:ml-4">
              I'm ready
            </button>
            <p className="mt-3 text-center md:text-left">
              We care about the protection of your data. Read our
              <span className="text-blue-600 ml-1 hover:underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }
  