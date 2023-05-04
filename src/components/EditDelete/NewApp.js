import Navbar from '../../components/Navbar';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Sample} from '../../components/Sample';
import NewFeedArea from './NewFeedArea'; 
import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
function NewApp() {
  return (
    <div>
    <div className="NewApp">
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

export default NewApp;