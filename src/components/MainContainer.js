import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => {
    return store.movies?.nowPlayingMovies;
  });

  if (!movies) return;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative h-[78vh] min-h-[560px] overflow-hidden bg-black sm:h-[72vh] sm:min-h-[520px] lg:h-[80vh] lg:max-h-[820px]">
      <VideoTitle movieId={id} title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
