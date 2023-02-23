import React, { useEffect , useState} from 'react';
import CardBox from './CardBox';
import "../css/Movie.css";
import PaginationBox from './PaginationBox';
let apiKey = "f7c839883fc085f9357c84ea65a753d0";

function PageComp(props) {
    const [pageClick, setPageClick] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [data, setData] = useState([]);
   let movieTech;
   

    const fetchMovie = (movieOrTv, movieType)=>{
        return fetch(
        `https://api.themoviedb.org/3/${movieOrTv}/${movieType}?api_key=${apiKey}&page=${pageClick}`) .then((res)=>res.json())
        .then((response)=>{
          console.log(response)
          setData(response.results);
          setTotalPage(response.total_pages);
        })
    }
    
        useEffect(() => {

          if(props.type === "PopularMovie"){
            fetchMovie("movie","popular");
            movieTech="movie";
          }
          if(props.type === "topRateMovie"){
            fetchMovie("movie","top_rated");
            movieTech="movie";
          }
          if(props.type === "UpcomingMovie"){
            fetchMovie("movie","upcoming");
            movieTech="movie";
          }
          if(props.type === "PopularTvShow"){
            fetchMovie("tv","popular");
            movieTech="tv";
          }
          if(props.type === "topRateTvShow"){
            fetchMovie("tv","top_rated");
            movieTech="tv";
          }
          if(props.type === "airingToday"){
            fetchMovie("tv","airing_today");
            movieTech="tv";
          }
          },[pageClick, props.type])
        
          function changePages(pages){
            setPageClick(pages);
         }
  return (
    <>
    <PaginationBox changePages={changePages} totalPages={totalPage}/>
    <div id='movieBox'>
      {console.log(data)}
    {data &&
          data.map((card) => (
           
            <CardBox
              key={card.id}
              id={card.id}
              poster={card.poster_path}
              title={card.title || card.name}
              original_language={card.original_language}
              date={card.first_air_date || card.release_date}
              media_type={movieTech}
              vote_average={Math.floor(card.vote_average * 10)}
            />
        
))}
    </div>
    </>
  )

}

export default PageComp