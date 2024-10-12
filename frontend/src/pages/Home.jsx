// In Home.jsx
import Navbar from '../components/Navbar';
import SearchService from '../components/SearchService';

function Home() {
  return (
    <>
      <Navbar />
      <SearchService />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome to MediConnect</h1>
        <p>Find the best doctors and book appointments with ease.</p>
      </div>
    </>
  );
}

export default Home;
