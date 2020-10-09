import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    // a snippet of code which runs based on specific condition
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            console.log(request.data.results)
            return request
        }
        fetchData()

        // if [], run once when the row loads and don't run it again
        // if [fetchUrl] => whever fetchUrl changes, the code runs again
    }, [fetchUrl])

    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
            autoplay: 1,
            // https://developers.google.com/youtube/player_parameters
            
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.name || "").then(url => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'))
            }).catch((err) => console.log(err))
        }
    }

  return (
    <div className="row">
      {/*   */}
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row__poster(s) */}

        {movies.map((movie) => (
          <img 
          key={movie.id}
          onClick={() => handleClick(movie)}
           className={`row__poster ${isLargeRow && "row__posterLarge"} `}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path  } `} 
            alt={movie.name} />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opt={opts} />}

    </div>
  );
}

export default Row;
