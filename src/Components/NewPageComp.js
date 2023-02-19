import React,{useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Youtube from "react-youtube";
import "../css/NewPageComp.css";
import { width } from '@mui/system';
let apiKey = "f7c839883fc085f9357c84ea65a753d0";


function NewPageComp() {
    const [video, setVideo] = useState();
    const [content, setContent] = useState();
    const location = useLocation();
    let from = location.state;
    let media;
   if(from.media_type){
    media=from.media_type;
   }else{
    media="movie"
   }
 

    function fetchData(){
      return fetch(`https://api.themoviedb.org/3/${media}/${from.id}?api_key=${apiKey}&language=en-US`)
      .then((res)=>res.json())
      .then((data)=>{
        setContent(data);
      }).catch((err)=>{
        console.log(err)
      })
      
    };
    function fetchVideo(){
      return fetch(`https://api.themoviedb.org/3/${media}/${from.id}/videos?api_key=${apiKey}&language=en-US`)
      .then((res)=>res.json())
      .then((data)=>{
        setVideo(data.results[0]?.key);
      }).catch((err)=>{
        console.log(err)
      })
      };

    
      useEffect(()=>{
      fetchVideo();
      fetchData();
         // eslint-disable-next-line
      },[])

      const options = {
        control : 0,
        showinfo: 0,
        height: '390',
        width: '640'
      }
      
      
    //   const myStyle={
    //     backgroundImage: `url(https://image.tmdb.org/t/p/w300${content.backdrop_path})`,
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
       
    // };
  return (
    <>
     {content && (
   <div className='pageBox' >
    {console.log(content)}
       <img src={from.poster ? `https://image.tmdb.org/t/p/w300${from.poster}` : ""} />
       <div>
        <h1> {from.title} <span>({content.release_date.split("-")[0]})</span></h1>
        {/* <Link to={content.homepage} ></Link> */}
       </div>
        {/* <Youtube
        videoId={video}
        opts={options}  
      /> */}
    </div>
     )}
    </>
  )
}

export default NewPageComp