import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { setGptSearchView, toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        if (location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch, location.pathname, navigate]);

  const handleGptSearchClick = () => {
    if (location.pathname !== "/browse") {
      dispatch(setGptSearchView(!showGptSearch));
      navigate("/browse");
      return;
    }

    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute inset-x-0 top-0 z-30 flex flex-col items-center justify-between gap-2 bg-gradient-to-b from-black px-4 py-3 sm:px-6 md:flex-row md:items-start md:px-8">
      <img className="w-32 sm:w-44 md:w-52" src={LOGO} alt="logo" />
      {user && (
        <div className="flex w-full flex-wrap items-center justify-center gap-2 text-sm sm:w-auto sm:flex-nowrap md:justify-end md:text-base">
          {showGptSearch && (
            <select
              className="max-w-[9rem] rounded bg-gray-900 p-2 text-white sm:max-w-none"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="rounded-lg bg-purple-800 px-3 py-2 text-white sm:px-4"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img
            className="hidden h-10 w-10 shrink-0 sm:block md:h-12 md:w-12"
            src={USER_AVATAR}
            alt="user icon"
          />
          <button
            onClick={handleSignOut}
            className="whitespace-nowrap font-bold text-white"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
