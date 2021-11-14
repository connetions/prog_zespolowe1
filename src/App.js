// import logo from './logo.svg';
// import './App.css';
import React, {Component} from 'react'
import Login from "./components/Login";
import Register from "./components/Register";
import MainApp from "./components/MainApp";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


class App extends Component {
  render(){
    return (
      
      <Router>
        <Routes>
          <Route path='/' element = { <Login /> } />
          <Route path='/register' element =  { <Register/> } />
          <Route path='/mainapp' element = { <MainApp /> } />
        </Routes>
      </Router>
    )
  }
}

export default App;
