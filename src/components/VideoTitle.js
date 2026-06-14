import { useNavigate } from "react-router-dom";

const VideoTitle = ({ movieId, title, overview }) => {
  const navigate = useNavigate();

  const handleMovieDetailsClick = () => {
    navigate("/movie/" + movieId);
  };

  return (
    <div className="absolute inset-0 z-10 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent px-4 pb-12 pt-32 text-white sm:bg-gradient-to-r sm:from-black sm:via-black/60 sm:to-transparent sm:px-8 sm:pb-16 md:px-12 lg:pb-20">
      <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="line-clamp-3 max-w-xl py-4 text-sm sm:line-clamp-4 sm:py-6 sm:text-base md:w-1/2 md:text-lg lg:w-1/3">
        {overview}
      </p>
      <div className="flex flex-wrap my-3 gap-2 sm:gap-3">
        <button
          className="rounded-lg bg-white px-6 py-3 text-base text-black hover:bg-opacity-80 sm:px-10 sm:text-lg md:px-12 md:text-xl"
          onClick={handleMovieDetailsClick}
        >
          ▶ Play
        </button>
        <button
          className="rounded-lg bg-gray-500 px-6 py-3 text-base text-white hover:bg-opacity-80 sm:px-10 sm:text-lg md:px-12 md:text-xl"
          onClick={handleMovieDetailsClick}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
