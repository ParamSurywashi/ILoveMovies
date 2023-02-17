import React from 'react'
import Badge from '@mui/material/Badge';
function CardBox(props) {
    //console.log(props)
  return (
   <>
   <div id='cardFlex'>
   <Badge
        badgeContent={props.vote_average}
        color={props.vote_average > 6 ? "primary" : "secondary"}
      />
    <img
        className="poster"
        src={props.poster ? `https://image.tmdb.org/t/p/w300${props.poster}` : ""}
        alt={props.title}
      />
      <b className="title">{props.title}</b>
      <span className="subTitle">
        {props.media_type === "tv" ? "TV Series" : "Movie"} <br />
        <span className="subTitle">{props.date}</span>
      </span> 
      </div>
   </>
  )
}

export default CardBox