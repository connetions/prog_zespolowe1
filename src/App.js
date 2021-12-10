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
import SearchGoods from './components/SearchGoods';
import MyAccount from './components/MyAccount';
import EditUser from './components/EditUser';

class App extends Component {
  render(){
    return (
      
      <Router>
        <Routes>
          <Route path='/' element = { <Login /> } />
          <Route path='/register' element =  { <Register/> } />
          <Route path='/mainapp' element = { <MainApp/> } />
          <Route path='/offer/:IDoffert' element = { <Offer/>} />
          <Route path='/addgoods' element = { <AddGoods/>} />
          <Route path='/myaccount' element = { <MyAccount/>} />
          <Route path='/edituser' element = { <EditUser/>} />
          <Route path='/categoryoffert/:category' element = { <CategoryOffert/>} />
          <Route path='/searchgoods/:searchName/:voivodeshipName' element = { <SearchGoods/>} />
        </Routes>
      </Router>
    )
  }
}

export default App;
