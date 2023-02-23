import React,{useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Youtube,{ YouTubePlayer } from "react-youtube";
import "../css/NewPageComp.css";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

let apiKey = "f7c839883fc085f9357c84ea65a753d0";


function NewPageComp() {
    const [video, setVideo] = useState();
    const [content, setContent] = useState();
    const [cast, setCast] = useState([]);
    const location = useLocation();

    //let videoElement: YouTubePlayer = null;
    let from = location.state;
    let media;
   if(from.media_type){
    media=from.media_type;
   }else{
    media="tv"
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
        //console.log(data)
        setVideo(data.results[0]?.key);
      }).catch((err)=>{
        console.log(err)
      })
      };

    function fetchDirector(media){
      
      return fetch(`https://api.themoviedb.org/3/${media}/${from.id}/credits?api_key=${apiKey}`)
      .then(response => response.json())
      .then((jsonData)=>{
     //  console.log(jsonData);
       setCast(jsonData.cast)
      });
    }
    // jsonData.crew.filter(({job})=> (job ==='Director') ? console.log(job) : "")
      useEffect(()=>{
      fetchVideo();
      fetchData();
      fetchDirector(media);
         // eslint-disable-next-line
      },[])

      const options = {
        control : 0,
        showinfo: 0,
        height: '390',
        width: '640',
        playerVars: {
          enablejsapi: 1,
          origin: "http://localhost:3000",
          loop: 0,
          autoplay:0
      },
      }
      
      
    //   const myStyle={
    //     backgroundImage: `url(https://image.tmdb.org/t/p/w300${  content.backdrop_path
    //     ? `https://image.tmdb.org/t/p/w500/${content.backdrop_path}`
    //     :  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"})`,
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover"
       
    // };

    function setCastBox(cast){
      
        return (
          <div className='castBoxDetails' key={cast.id}>

          <img className="castPoster"
        src={cast.profile_path ? `https://image.tmdb.org/t/p/w300${cast.profile_path}` : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"}
        /> <br />
        <b className="name">{cast.name}</b>  <br />
         <span>Character : {cast.character}</span> <br />
        <span >{cast.known_for_department}</span>
          </div>
        )
    }
  return (
    <>
     {content && (
   <div className='pageBox'  >
     {/* <img 
                  src={
                    content.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${content.backdrop_path}`
                      :  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"
                  }
                  alt={content.name || content.title}
                  className="imgForBackground"
                /> */}
   
       <img id='imagesPoster' src={from.poster ? `https://image.tmdb.org/t/p/w300${from.poster}` : ""} />
    <div className='cardOfBox'>
        <h1> {from.title} <span>({(content.release_date)?(content.release_date.split("-")[0]):(content.first_air_date.split("-")[0])})</span></h1>
        {/* <Link to={content.homepage} ></Link> */}
      <div >
        <Box id="circularTxtBox" sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" color="secondary" id='idBoxVoteAvg' value={from.vote_average} size={60} thickness={4}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary" id="boldTxtForVote">
          {`${from.vote_average}%`}
        </Typography>
      </Box>
    </Box>
    <div id='usrScoreTxt'>User <br/> Score</div>
    </div>
    <div id='tagLineTxt'>{content.tagline}</div>
    <div className='titleOfPage'> <span>Overview</span> <br/>{content.overview}</div>
  
       </div>
       <div> <Youtube
        videoId={video}
        opts={options}  
      />
      </div>
      
    </div>
     )}
     <div className='otherBox'>
        <h1>Cast</h1>
        <div className='gridOfCast'>
          {cast && cast.map((cst)=>{
           return setCastBox(cst);
          })}
        </div>
     </div>
    </>
  )
}

export default NewPageComp