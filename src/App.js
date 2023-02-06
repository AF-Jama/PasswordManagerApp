import React from 'react';
import { Routes,Route} from 'react-router'; // React Router 
import HomeComponent from './components/HomeComponent';
import PasswordComponent from './components/PasswordComponent';
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import AddForm from './components/AddForm';
import Add from './Pages/Add';
import WelcomePage from './Pages/WelcomePage';
import Main from './Pages/Main';
import Card from './components/Card';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/common/NavBar';
import Header from './components/common/Header';
import './App.css';

// const uri='http://localhost:3000/'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<WelcomePage/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/passwords' element={<Main/>}/>
        <Route path='/card' element={<Card/>}/>
        <Route path='/passwords/add' element={<Add/>}/>
      </Routes>
    </div>
  );
}

export default App;
