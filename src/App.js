import React from "react";
import { Route, Routes } from "react-router-dom";
import Trending from "./Components/Trending";
function App() {
  return (
      <Routes>
        <Route path='/' element={
            <Trending />
          }/> 
      </Routes>
   
   
  );
}

export default App;
