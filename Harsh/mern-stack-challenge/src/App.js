// src/App.js
import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";

import './App.css'

function App() {
  

  return (
    <div className="App">
      <h1>MERN Stack Challenge</h1>


      <TransactionsTable  />
      
    </div>
  );
}

export default App;
