import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div>
      <h1 className="py-3 text-lg text-white sm:text-2xl md:py-4 md:text-3xl">
        {title}
      </h1>
      <div className="touch-auto overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-3 py-2 sm:gap-4">
          {movies?.map((movie) => (
            <MovieCard
              key={movie?.id}
              movieId={movie?.id}
              posterPath={movie?.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
