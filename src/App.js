// import logo from './logo.svg';
// import './App.css';
import React, {Component} from 'react'
import Login from "./components/Login";
import Register from "./components/Register";
import MainApp from "./components/MainApp";
import Offer from "./components/Offer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddGoods from './components/AddGoods';
import CategoryOffert from './components/CategoryOffert';

class App extends Component {
  render(){
    return (
      
      <Router>
        <Routes>
          <Route path='/' element = { <Login /> } />
          <Route path='/register' element =  { <Register/> } />
          <Route path='/mainapp' element = { <MainApp/> } />
          <Route path='/offer' element = { <Offer/>} />
          <Route path='/addgoods' element = { <AddGoods/>} />
          <Route path='/categoryoffert/:category' element = { <CategoryOffert/>} />
        </Routes>
      </Router>
    )
  }
}

export default App;
