import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="fixed inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="bg-image"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 px-4 pb-8 pt-32 sm:px-6 md:px-8">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
