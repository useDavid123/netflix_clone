import React,{useState,useEffect} from 'react'
import axios from "./axios"
import YouTube from 'react-youtube';
import movieTrailer from "movie-trailer";
import "./Row.css"

const baseURL = "https://image.tmdb.org/t/p/w500";

const Row = ({title , fetchUrl , isLargeRow}) => {
    const [movies, setMovies] = useState([])
    const [trailerUrl , setTrailerUrl] = useState("")

    useEffect(() => {
        const fetchData = async() =>{
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            
        }
           fetchData();
    }, [fetchUrl])
    // console.table(movies)
    const opts={
       height: '390',
       width: "100%",
       playerVars:{
          autoplay:1,
       },
    }

   const handleClick = (movie) => {
    
     console.log(movie?.title)
       if(trailerUrl)
       {
         setTrailerUrl("")
       }
       else{
        movieTrailer(movie?.title).then((url)=>{
          // if(url === null){
          //   handleClick(movie)
          //   return
          // }
         
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log(urlParams.get("v"))
          setTrailerUrl(urlParams.get("v"));

        }).catch((error)=>(console.log(error)))

       }
   }
  //  console.log(trailerUrl)

    return (
        <div className="row">
            {/* title */}

         <h2>{title}</h2>
          {/* container */}
          <div className="row_posters">

            {movies.map((movie)=>{
                // console.log(`${baseURL}${movie.poster_path}`)
              return  (
                 
               <img key={movie.id}
               onClick={()=> handleClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                src ={`${baseURL}${isLargeRow?movie.poster_path:movie.backdrop_path}`}
                 alt={movie.name} />
             
               )
            })}
          </div>
           { trailerUrl && (<YouTube videoId={trailerUrl}  opts={opts} />) }
        </div> 
    )
}

export default Row
