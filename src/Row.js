import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // if [], run once when the row loads, and dont run again

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.table(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      {/*   */}
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row__poster(s) */}

        {movies.map((movie) => (
          <img 
          key={movie.id}
           className={`row__poster ${isLargeRow && "row__posterLarge"} `}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path  } `} 
            alt={movie.name} />
        ))}
      </div>
    </div>
  );
}

export default Row;