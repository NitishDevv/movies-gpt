import Header from "./Header";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const gptSearchView = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {gptSearchView ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      {/* 
        MainContainer
          - Video Background
          - Video Title

        SecondaryContainer
          - MovieList * n
          - Cards * n
      */}
    </div>
  );
};

export default Browse;
