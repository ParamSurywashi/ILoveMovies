import React from "react";
import { Route, Routes } from "react-router-dom";
import Movie from "./Components/Movie";
import NewPageComp from "./Components/NewPageComp";
import Search from "./Components/Search";
import Trending from "./Components/Trending";
import TvShows from "./Components/TvShows";
function App() {
  return (
      <Routes>
        <Route path='/' element={
            <Trending />
          }/> 
        <Route path='/Movie' element={
            <Movie />
          }/> 
         <Route path='/Tv Shows' element={
            <TvShows />
          }/> 
        <Route path='/Search' element={
            <Search />
          }/> 
          <Route path='/newPageComp' element={
            <NewPageComp /> 
          }/> 
      </Routes>
   
   
  );
}

export default App;
