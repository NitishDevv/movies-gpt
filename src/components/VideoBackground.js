import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  // use movieId to fetch the video url and set it as background
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo) return null;

  return (
    <div className="absolute inset-0 h-full w-screen overflow-hidden bg-black">
      <iframe
        className="absolute left-1/2 top-1/2 h-full w-full min-w-[100vw] max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-[56.25vw] sm:min-h-full sm:w-screen"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo +
          "?autoplay=1&mute=1&controls=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
