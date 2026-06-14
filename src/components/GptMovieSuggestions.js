import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults, isLoading } = useSelector(
    (state) => state.gpt,
  );

  if (isLoading) {
    return (
      <div className="mx-auto mt-6 max-w-7xl rounded-lg bg-black/90 p-3 text-white sm:p-4">
        <div className="space-y-6">
          {[0, 1, 2].map((row) => (
            <div key={row}>
              <div className="mb-3 h-7 w-40 animate-pulse rounded bg-gray-700" />
              <div className="flex gap-3 overflow-hidden sm:gap-4">
                {[0, 1, 2, 3, 4, 5].map((card) => (
                  <div
                    className="h-40 w-28 shrink-0 animate-pulse rounded bg-gray-800 sm:h-52 sm:w-36 md:h-64 md:w-44 lg:h-72 lg:w-48"
                    key={card}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
