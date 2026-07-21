import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import Header from "./Header";
import { checkValidData } from "../utils/validateLogin";
import { updateProfile } from "firebase/auth";
import { BG_URL } from "../utils/constants";

const LoginPage = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return null;

    // SignIn/SignUp Logic
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="fixed inset-0">
        <img
          className="h-full w-full object-cover"
          src={BG_URL}
          alt="bg-image"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute left-1/2 top-28 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-lg bg-black bg-opacity-75 p-6 text-white sm:top-32 sm:p-8 md:top-36 lg:w-1/3 lg:max-w-lg lg:p-12"
      >
        <h1 className="py-3 text-2xl font-bold sm:text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="my-3 w-full bg-gray-700 p-3 sm:my-4 sm:p-4"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="my-3 w-full bg-gray-700 p-3 sm:my-4 sm:p-4"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="my-3 w-full bg-gray-700 p-3 sm:my-4 sm:p-4"
        />
        <p className="py-1 text-sm font-bold text-red-500 sm:text-lg">
          {errorMessage}
        </p>
        <button
          className="my-5 w-full rounded-lg bg-red-700 p-3 sm:my-6 sm:p-4"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="my-3 cursor-pointer text-sm sm:my-4 sm:text-base"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Movies Mart? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
