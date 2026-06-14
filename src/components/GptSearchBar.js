import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.language);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const normalizeTitle = (title) => {
    return title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  };

  const getGenreIdsFromQuery = (query) => {
    const genreMap = {
      action: 28,
      adventure: 12,
      animation: 16,
      comedy: 35,
      crime: 80,
      documentary: 99,
      drama: 18,
      family: 10751,
      fantasy: 14,
      history: 36,
      horror: 27,
      music: 10402,
      mystery: 9648,
      romance: 10749,
      "sci fi": 878,
      science: 878,
      thriller: 53,
      war: 10752,
      western: 37,
    };

    const normalizedQuery = normalizeTitle(query);

    return Object.entries(genreMap)
      .filter(([genre]) => normalizedQuery.includes(genre))
      .map(([, genreId]) => genreId);
  };

  //   Search movie in TMDB API and get the results
  const searchMovieInTMDB = async (movie, genreIds) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );

    const json = await data.json();
    const normalizedMovie = normalizeTitle(movie);

    const exactTitleMatches = json.results.filter((result) => {
      return (
        normalizeTitle(result.title) === normalizedMovie ||
        normalizeTitle(result.original_title) === normalizedMovie
      );
    });

    const genreMatches = exactTitleMatches.filter((result) => {
      if (!genreIds.length) return true;
      return genreIds.every((genreId) => result.genre_ids?.includes(genreId));
    });

    const bestMatches = genreMatches.length ? genreMatches : exactTitleMatches;

    return bestMatches
      .sort((firstMovie, secondMovie) => {
        return (secondMovie.popularity || 0) - (firstMovie.popularity || 0);
      })
      .slice(0, 1);
  };
  const handleGptSearchClick = async () => {
    const userQuery = searchText.current.value;
    const genreIds = getGenreIdsFromQuery(userQuery);
    console.log(userQuery);

    // Make an API call to GPT API and get the movie Results

    const gptResults = await openai.responses.create({
      model: "gpt-5.4-mini",
      instructions:
        "Act as a Movie Recommendation system and suggest some movies for the query only give me name of 5 movies comma seperated like the result example ahead Result Example: Movie1, Movie2, Movie3, Movie4, Movie5.",
      input: userQuery,
    });
    console.log(gptResults.output_text);
    // converting The Conjuring, Hereditary, A Nightmare on Elm Street, It, The Babadook to []
    const moviesArray = gptResults.output_text
      .split(",")
      .map((movie) => movie.trim())
      .filter(Boolean);
    console.log(moviesArray);

    // For each movie search TMDB API

    const promiseArray = moviesArray.map((movie) =>
      searchMovieInTMDB(movie, genreIds),
    );
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: moviesArray, movieResults: tmdbResults }),
    );
  };

  return (
    <div className="flex justify-center pt-12 sm:pt-16 md:pt-20">
      <form
        className="grid w-full max-w-3xl grid-cols-1 gap-3 rounded-lg bg-black/90 p-3 sm:grid-cols-12 sm:gap-0 sm:p-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="rounded-lg p-3 text-sm sm:col-span-9 sm:m-2 sm:p-4 sm:text-base"
        />
        <button
          className="rounded-lg bg-red-700 px-4 py-3 text-white sm:col-span-3 sm:m-2"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
