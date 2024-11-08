// In Home.jsx
import Navbar from "../components/Navbar";
import SearchService from "../components/SearchService";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <SearchService />
      <div style={{ paddingTop: "10px", textAlign: "center" }}>
        <h1>Welcome to MediConnect</h1>
        <p>Find the best doctors and book appointments with ease.</p>
        {/* Link to /main page */}
        <Link
          to="/main"
          className="text-base text-blue-500 font-semibold hover:text-blue-700 transition duration-300"
        >
          Check MediConnect
        </Link>
      </div>
    </>
  );
}

export default Home;
