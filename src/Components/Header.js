import React from 'react'
import "../css/Header.css";
import LogoMovie from '../images/MoviesLogo.png';
import {MdLocalFireDepartment,MdMovie,MdSlideshow,MdSearch,MdOutlineVpnLock} from "react-icons/md";
function Header() {
  return (
    <div className="headers">
      <div><img src={LogoMovie} /></div>
      <ul>
         <MdLocalFireDepartment /> Trending
         <li></li>
      </ul>
      <ul>
         <MdMovie /> Movie
         <li></li>
      </ul>
      <ul>
          <MdSlideshow />TV Shows
         <li></li>
      </ul>
      <ul>
         <MdOutlineVpnLock /> About
         <li></li>
      </ul>
  
    <div id='searchIcon'> <MdSearch /> Search</div>
    </div>
  )
}

export default Header