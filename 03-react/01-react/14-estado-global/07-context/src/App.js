import React, { useState } from "react";
import AppRouter from "./routes/AppRouter";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRouter />
    </UserContext.Provider>
  );
};

export default App;
