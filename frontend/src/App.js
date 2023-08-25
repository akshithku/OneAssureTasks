import './App.css';
import Home from './components/home';
import Body from './components/body/body';
import NavBar from './components/Navbar';
import Planpage from './components/Planpage';
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <div className="App">
      <NavBar/>
     <Home/>
     <Body/>
     <Routes>
        <Route path='/planpage' element={<Planpage/>}/>
      </Routes>

    </div>
  );
}

export default App;
