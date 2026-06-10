import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  // use movieId to fetch the video url and set it as background
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);

  if (!trailerVideo) return null;

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
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
