export default function Email() {
  return (
    <div className="bg-gray-200 w-full max-w-screen-lg mx-auto p-8 md:p-24 rounded-lg hover:scale-105 duration-300">
    <div className="flex flex-col md:flex-row items-center">
      <div className="mb-4 md:mb-0 md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Want to work with us?
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore,
          possimus.
        </p>
      </div>
      <div className="md:ml-10 w-full md:w-auto">
        <input
          type="email"
          className="p-4 w-full md:w-[400px] rounded-lg mb-4 md:mb-0"
          placeholder="Enter Email"
        />
        <button className="bg-blue-900 hover:bg-blue-800 p-3 w-full md:w-auto md:inline-block rounded-lg text-white">
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
