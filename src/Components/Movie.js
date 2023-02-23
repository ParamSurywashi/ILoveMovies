import React, { useEffect , useState} from 'react';
import CardBox from './CardBox';
import "../css/Movie.css";
import PaginationBox from './PaginationBox';
import { ToggleButton, ToggleButtonGroup} from '@mui/material';

let apiKey = "f7c839883fc085f9357c84ea65a753d0";

function Movie() {
    const [pageClick, setPageClick] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [data, setData] = useState([]);
    const [bollyOrHolly, setbollyOrHolly] = useState("hi");

    const fetchMovie = ()=>{
        return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${bollyOrHolly}&page=${pageClick}`) .then((res)=>res.json())
        .then((response)=>{
          console.log(response)
          setData(response.results);
          setTotalPage(response.total_pages);
        })
    }
    
        useEffect(() => {
            fetchMovie();
          },[pageClick,bollyOrHolly])
        
          function changePages(pages){
            setPageClick(pages);
         }
         const handleChangeLang = (event, nextView) => {
          if(event.target.innerText==="BOLLYWOOD"){
            setbollyOrHolly("hi");
          }
          if(event.target.innerText==="HOLLYWOOD"){
            setbollyOrHolly("en");
          }
          if(event.target.innerText==="KOREAN"){
            setbollyOrHolly("ko");
          }
          if(event.target.innerText==="PANJABI"){
            setbollyOrHolly("pa");
          }
        };
  return (
    <>
    <PaginationBox changePages={changePages} totalPages={totalPage}/>
    <div id='dayWeek'>
        
        <ToggleButtonGroup className="toggleBox" value={bollyOrHolly} exclusive onChange={handleChangeLang} aria-label="text alignment">
            <ToggleButton value={bollyOrHolly} className="toggleBox">
              Bollywood
           </ToggleButton>
            <ToggleButton value={bollyOrHolly} className="toggleBox">
              Hollywood
            </ToggleButton>
            <ToggleButton value={bollyOrHolly} className="toggleBox">
              Korean
            </ToggleButton>
            <ToggleButton value={bollyOrHolly} className="toggleBox">
            PANJABI
            </ToggleButton>
       </ToggleButtonGroup>
      </div>

      <div>
      {/* https://api.themoviedb.org/3/configuration/languages?api_key=f7c839883fc085f9357c84ea65a753d0&page=1 */}
      </div>
    <div id='movieBox'>
    {data &&
          data.map((card) => (
        
            <CardBox
              key={card.id}
              id={card.id}
              poster={card.poster_path}
              title={card.title || card.name}
              original_language={card.original_language}
              date={card.first_air_date || card.release_date}
              media_type="movie"
              vote_average={Math.floor(card.vote_average * 10)}
            />
        
))}
    </div>
    </>
  )

}

export default Movie