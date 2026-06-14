import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies && (
      <div className="bg-black">
        <div className="relative z-20 space-y-2 px-4 pb-8 pt-6 sm:px-6 md:px-8 lg:px-12">
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
          <MovieList title={"Trending"} movies={movies?.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies?.popularMovies} />
          <MovieList title={"Horror"} movies={movies?.nowPlayingMovies} />
        </div>

        {/* 
      MovieList * n
        - Cards * n
    */}
      </div>
    )
  );
};

export default SecondaryContainer;
