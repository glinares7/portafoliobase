import { Route, Switch, Redirect } from "react-router-dom";

import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";

// <Redirect to="/auth/login" />
const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginScreen} />
      <Route exact path="/auth/register" component={RegisterScreen} />
      <Redirect to="/auth/login" />
    </Switch>
  );
};

export default AuthRouter;
