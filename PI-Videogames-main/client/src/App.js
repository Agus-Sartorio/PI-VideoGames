import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreateVideoGame from './components/CreateVideoGame/CreateVideoGame.jsx';
import VideoGameDetail from './components/VideoGameDetail/VideoGameDetail.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/videogame" element={<CreateVideoGame/>}/>
        <Route path="/home/videogame/:id" element={<VideoGameDetail/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
