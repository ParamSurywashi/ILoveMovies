import React,{useEffect, useState} from 'react';
import { FcSearch } from "react-icons/fc";
import "../css/Search.css";
import CardBox from './CardBox';
import PaginationBox from './PaginationBox';

let apiKey = "f7c839883fc085f9357c84ea65a753d0";
function Search() {
  let type = "movie";
  let searchText= "Harry";
  const[result, setResult] = useState([]);
  const [pageClick, setPageClick] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
    function fetchAPI(){
       
        return fetch(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${apiKey}&language=en-US&query=${searchText}&page=${pageClick}&include_adult=false`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
          setResult(data.results);
          setTotalPage(data.total_pages);
        }).catch((err)=>{
          console.log(err)
        })
        };
  
       const handleSearch = (e)=>{
        console.log(e.target)
          fetchAPI();
       }
        // useEffect(()=>{
        // fetchAPI();
        //    // eslint-disable-next-line
        // },[])
        function changePages(pages){
            setPageClick(pages);
            fetchAPI();
         }
  return (
    <div className='searchPageContainer'>
          <div className="input-box">
              <i><FcSearch /></i>
              <input type="text" placeholder="Search for a Movie, TV Shows, Person...." />
              <button className="button" onClick={(e)=>handleSearch(e)}>Search</button>
         </div> 
         <div>
         <PaginationBox changePages={changePages} totalPages={totalPage}/>
         {result &&
          result.map((card) => (
            <CardBox
              key={card.id}
              id={card.id}
              poster={card.poster_path}
              title={card.title || card.name}
              original_language={card.original_language}
              date={card.first_air_date || card.release_date}
              media_type={card.media_type}
              vote_average={Math.floor(card.vote_average * 10)}
            />
          ))}
         </div>
    </div>
  )
}

export default Search