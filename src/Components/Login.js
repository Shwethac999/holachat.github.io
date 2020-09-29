import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../Firebase/firebase";
import { actionTypes } from "./Reducer/reducer";
import { useStateValue } from "./Provider/StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img src="images/logo.png" alt="logo" />
        <div className="login-text">
          <h3>Sign in to Hola Chat</h3>
        </div>
        <Button onClick={signIn}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            className="google"
            alt="G"
          />
          {"  "}
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
