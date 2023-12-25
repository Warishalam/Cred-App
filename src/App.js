import './App.css';
import Navbar from './components/Navbar';
import {Route,Routes} from "react-router-dom"
import Login from './components/login';
import LandingPage from "./components/LandingPage"
import Redeeming from "./components/Redeeming"
import Show_offer from "./components/Show_offer"
import Congratulation from "./components/Congratulation"
import Spanning_wheel from "./components/Spanning_wheel"
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
         <Route path='/' element={<Login/>}></Route>
         <Route path='/landingpage' element={<LandingPage/>}></Route>
         <Route path='/showthe' element={<Redeeming/>}></Route>
         <Route path='/spanning' element={<Show_offer/>}></Route>
         <Route path='/congratulation' element={<Congratulation/>}></Route>
         <Route path='/redeeming' element={<Spanning_wheel/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
