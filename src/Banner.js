import React,{useState, useEffect} from 'react'
import axios from "./axios"
import request  from "./request";
import "./Banner.css";
const Banner = () => {
    const [movie , setMovie] = useState([])

    useEffect(() => {
        const fetchData = async() =>{
            try{

                const req = await axios.get(request.fetchNetflixOriginals)
                // console.log(req.data.results);
                const movies = req.data.results[Math.floor(Math.random() * req.data.results.length -1)]
                setMovie(movies)
                
            }
            catch(error){
                console.log(error)
            }
        }
           fetchData();
    }, [])

    const truncate = (str , n) =>{
        return str?.length>n ? str.substr(0, n-1)+ "..." : str;
    }
    // console.log(movie.backdrop_path)
    return (
        <header className="banner" style={{
            backgroundSize:"cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center",
        
        }}>


            <div className="banner_contents" >
                 <h1 className="banner_title"> 
                    {movie?.name|| movie?.title || movie?.original_name }
  </h1>
  <div className="banner_buttons">
       <button className="banner_button">
          Play
       </button>
       <button className="banner_button">
        My List
       </button>
       </div>
       
       <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
       </div>
        <div className="banner_fadeBottom" />
        </header>
          
    )
}

export default Banner
