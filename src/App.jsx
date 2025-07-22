import HomeContent from './components/HomeContent';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 dark:text-white text-black">
      <Navbar />
      <HomeContent/>
    </div>
  );
}

export default App;
