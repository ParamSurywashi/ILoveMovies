import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Header.css";
import LogoMovie from '../images/MoviesLogo.png';
import {MdLocalFireDepartment,MdMovie,MdSlideshow,MdSearch,MdOutlineVpnLock} from "react-icons/md";
function Header() {
  return (
    <div className="headers">
       <Link to="/"><div><img src={LogoMovie} /></div> </Link>
      <ul>
        <Link to="/" className='linkComp'> <MdLocalFireDepartment /> Trending </Link>
         <li></li>
      </ul>
      <ul>
      <Link to="/Movie" className='linkComp'> <MdMovie /> Movie </Link>
         <li></li>
      </ul>
      <ul>
      <Link to="/Tv Shows" className='linkComp'>  <MdSlideshow />TV Shows </Link>
         <li></li>
      </ul>
    
  
    <Link to="/Search" id='searchIcon'> <MdSearch /> Search</Link>
    </div>
  )
}

export default Header