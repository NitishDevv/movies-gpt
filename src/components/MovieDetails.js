import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch("https://api.themoviedb.org/3/movie/" + movieId, API_OPTIONS),
          fetch(
            "https://api.themoviedb.org/3/movie/" + movieId + "/credits",
            API_OPTIONS,
          ),
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error("Unable to fetch movie details.");
        }

        const movieJson = await movieResponse.json();
        const creditsJson = await creditsResponse.json();

        setMovie(movieJson);
        setCast(creditsJson.cast?.slice(0, 10) || []);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-36 sm:px-6 md:px-8">
        <button
          className="mb-6 rounded bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          onClick={() => navigate(-1)}
          type="button"
        >
          Back
        </button>

        {errorMessage && (
          <p className="rounded bg-red-900/60 p-4 text-red-100">
            {errorMessage}
          </p>
        )}

        {!movie && !errorMessage && (
          <p className="rounded bg-white/10 p-4">Loading movie details...</p>
        )}

        {movie && (
          <>
            <section className="grid gap-8 md:grid-cols-[minmax(220px,340px)_1fr] md:items-start">
              {movie.poster_path ? (
                <img
                  className="mx-auto aspect-[2/3] w-full max-w-xs rounded-lg object-cover shadow-2xl md:max-w-none"
                  src={IMG_CDN_URL + movie.poster_path}
                  alt={movie.title + " poster"}
                />
              ) : (
                <div className="mx-auto flex aspect-[2/3] w-full max-w-xs items-center justify-center rounded-lg bg-gray-800 p-6 text-center text-gray-300 shadow-2xl md:max-w-none">
                  Poster not available
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                  {movie.title}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-300">
                  {movie.release_date && <span>{movie.release_date}</span>}
                  {movie.runtime ? <span>{movie.runtime} min</span> : null}
                  {movie.vote_average ? (
                    <span>{movie.vote_average.toFixed(1)} rating</span>
                  ) : null}
                </div>
                <p className="mt-6 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg">
                  {movie.overview || "Description is not available."}
                </p>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">Cast</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
                {cast.map((person) => (
                  <div key={person.credit_id || person.cast_id || person.id}>
                    {person.profile_path ? (
                      <img
                        className="aspect-[2/3] w-full rounded object-cover"
                        src={IMG_CDN_URL + person.profile_path}
                        alt={person.name}
                      />
                    ) : (
                      <div className="flex aspect-[2/3] w-full items-center justify-center rounded bg-gray-800 p-3 text-center text-xs text-gray-300">
                        No image
                      </div>
                    )}
                    <p className="mt-2 text-sm font-semibold">{person.name}</p>
                    <p className="text-xs text-gray-400">{person.character}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default MovieDetails;
