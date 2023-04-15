import Navbar from '../../components/Navbar';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Sample} from '../../components/Sample';
import NewFeedArea from './NewFeedArea'; 
import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (
    <div>
    <div className="App">
      <Navbar />
      <p className="filter-btn">Filter</p>
        <Routes>
        <Route exact path="/">
          <Navigate to="/home" />
        </Route>
          <Route path="/home">
            < NewFeedArea />
          </Route>
          <Route path="/edit">
          
          </Route>
        </Routes>
  
      <Sample />
    </div>
    </div>
  );
}

export default App;