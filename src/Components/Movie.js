import React, { useEffect , useState} from 'react';
import CardBox from './CardBox';
import "../css/Movie.css";
import PaginationBox from './PaginationBox';
let apiKey = "f7c839883fc085f9357c84ea65a753d0";

function Movie() {
    const [pageClick, setPageClick] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [data, setData] = useState([]);
    const fetchMovie = ()=>{
    
        return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`) .then((res)=>res.json())
        .then((response)=>{
          console.log(response)
          setData(response.results)
        })
    }
    
        useEffect(() => {
            fetchMovie();
          },[pageClick])
        
          function changePages(pages){
            setPageClick(pages);
         }
  return (
    <>
    <PaginationBox changePages={changePages} totalPages={totalPage}/>
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
              media_type={card.media_type}
              vote_average={Math.floor(card.vote_average * 10)}
            />
        
))}
    </div>
    </>
  )

}

export default Movie