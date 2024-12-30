import { useState } from "react";
import bg_two from "../assets/images/bg_two.jpg";
import { useNavigate } from "react-router-dom";

export default function Intro({ handleUsername }: { handleUsername: (name: string) => void }) {
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUsername(username); 
    navigate('/home'); 
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg_two})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-8 flex-col h-full py-60">
        <div>
          <h1 className="text-white text-[200px] max-sm:text-8xl leading-tight font-bold font-roboto ">
            To Do
          </h1>
          <p className="mt-3 text-4xl max-sm:text-2xl text-red-400 font-light text-center">
            Create And Manage <br /> Your Tasks Now.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="username"
            value={username}
            required
            placeholder="What should I call you?"
            className="w-full px-6 py-3 text-xl font-medium text-gray-800 bg-white rounded-md border border-gray-300 focus:outline-none focus:border-red-400"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="px-24 py-3 border text-white border-white rounded-full hover:bg-white hover:text-black transition ease-in-out duration-300"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}
