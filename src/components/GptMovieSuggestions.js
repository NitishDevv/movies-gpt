import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((state) => state.gpt);

  if (!movieNames) return null;

  return (
    <div className="mx-auto mt-6 max-w-7xl rounded-lg bg-black/90 p-3 text-white sm:p-4">
      <div className="space-y-2">
        {movieNames.map((movieName, index) => {
          return (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
