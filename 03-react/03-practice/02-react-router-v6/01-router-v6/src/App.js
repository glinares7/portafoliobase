import "./sass/App.scss";

import { UseContext } from "./contexts/AuthContext";
// import { themes } from "./helpers/Pictures";
import { useState } from "react";

import AppRouter from "./routes/AppRouter";

const App = () => {
  const [appcontext, setAppcontext] = useState();
  const [sliderc, setSliderc] = useState();

  const [log, setLog] = useState(false);

  const [user, setUser] = useState(null);

  const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    },
  };

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return (
    <UseContext.Provider
      value={{
        appcontext,
        setAppcontext,
        sliderc,
        setSliderc,
        log,
        setLog,
        user,
        setUser,
        signin,
        signout,
      }}
    >
      <AppRouter />
    </UseContext.Provider>
  );
};

export default App;
