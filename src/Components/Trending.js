import React, { useEffect } from 'react';
import { useState } from 'react';
import CardBox from './CardBox';
import "../css/Trending.css";
import PaginationBox from './PaginationBox';
let apiKey = "f7c839883fc085f9357c84ea65a753d0";
function Trending() {
    const [content, setContent] = useState([]);
    const [pageClick, setPageClick] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const fetchTrading = ()=>{
      
        return fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&page=${pageClick}`) .then((res)=>res.json())
      .then((response)=>{
        console.log(response)
         setContent(response.results);
         setTotalPage(response.total_pages);
      })
 }
  
      useEffect(() => {
        fetchTrading();
        },[pageClick])
  
        function changePages(pages){
           setPageClick(pages);
        }
        function FetchCard(content, movieType){
          return (
            <>
            <h1>Trending {movieType}</h1>
      <div id='cardBox'>
        {(movieType === "Movie") ? ( <>
      {content &&
          content.map((card) => (
            (card.media_type === "movie") ? (
            <CardBox
              key={card.id}
              id={card.id}
              poster={card.poster_path}
              title={card.title || card.name}
              date={card.first_air_date || card.release_date}
              media_type={card.media_type}
              vote_average={card.vote_average}
            />
            ):""
          ))} </> ):(<>
            {content &&
                content.map((card) => (
                  (card.media_type === "tv") ? (
                  <CardBox
                    key={card.id}
                    id={card.id}
                    poster={card.poster_path}
                    title={card.title || card.name}
                    date={card.first_air_date || card.release_date}
                    media_type={card.media_type}
                    vote_average={card.vote_average}
                  />
                  ):""
                ))} </>)}
          </div>
          </>
          )
        }
  return (
    <div>
      
      <PaginationBox changePages={changePages} totalPages={totalPage}/>
      {FetchCard(content,"Movie") }
      {FetchCard(content,"TV Serial") }
      {FetchCard(content,"Movie") }
    </div>
  )
}

export default Trending