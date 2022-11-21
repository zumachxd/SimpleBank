import React from 'react';
import { Card } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/Home';
import Login from './components/Login';
import NewUser from './components/NewUser';


function App() {

  return (
    <>
    <Card >
   <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/newUser' element={<NewUser/>} />
    <Route path='/home' element={ <HomePage/> }/>
   </Routes>
   <Card bg='dark'>

   </Card>
   </Card>
   </>
  );
}

export default App;
