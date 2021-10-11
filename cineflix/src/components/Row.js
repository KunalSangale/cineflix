import { useState,useEffect } from "react";
import axios from "../axios";
import {  } from "../css/Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';
const base_url="https://image.tmdb.org/t/p/original/"
const Row = ({title,fetchUrl,isLargeRow}) => {
    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("");
    useEffect(()=>{
        //if [] is left blank the function will run once when the row loads and not again
        //if [movies] it will run once when the row loads and then every time when 'movies' changes
        //we add [fetchUrl] at the end so that when we use a different fetchUrl, the component will re-render! Whenever we use a variable from outside the block (fetchUrl in this case) we have to use it in the [] at the end
        async function fetchData(){
        const request=await axios.get(fetchUrl);
        //console.log(request.data.results);
        setMovies(request.data.results);
        return request;
        }
        fetchData();
    },[fetchUrl]);
    const opts={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1
        },

    };
    const handleClick = (movie)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }
        else
        {
            //this is an npm module which finds the trailer for the given movie name
            movieTrailer(movie?.name || "")
            .then((url)=>{
                //this is done because we dont need the full url only the video ID
                const urlParams=new URLSearchParams(new URL(url).search);
                //https://www.youtube.com/watch?v=W7kSd1nSrJI
                //this gets the video ID which is after 'v' in the above url
                setTrailerUrl(urlParams.get('v'));
            }).catch((error)=>console.log(error));
        }
    }
   return (
        <div className="row">
           <h2>{title}</h2> 
           <div className="row__posters">
            {movies.map(movie=>(
                //poster_path:/4q2hz2m8hubgvijz8Ez0T2Os2Yv.jpg Which is not a url.So we need to add the base url
                // <img src={movie.poster_path} alt={movie.name}/>
                <img 
                key={movie.id}
                onClick={()=>handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${isLargeRow?movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
            ))}
           </div>
           {/* show the video only when we have the trailer URL */}
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
