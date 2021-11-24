import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreateVideoGame from './components/CreateVideoGame/CreateVideoGame.jsx';
import VideoGameDetail from './components/VideoGameDetail/VideoGameDetail.jsx';
import RutaCualquiera from './components/RutaCualquiera/RutaCualquiera.jsx'

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/videogame" element={<CreateVideoGame/>}/>
        <Route path="/home/videogame/:id" element={<VideoGameDetail/>}/>
        <Route path="*" element={<RutaCualquiera/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
