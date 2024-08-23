import React, { useEffect, Suspense } from "react";

import { useDispatch, useSelector } from "react-redux";

//bounce loader
import { BounceLoader } from "react-spinners";

//router-dom
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "../src/pages/Login";
import Forgot from "../src/pages/ForgotPassword";
import Change from "../src/pages/ChangePassword";
import AuthRoute from "./util/AuthRouter";

import { SET_ADMIN } from "./store/admin/types";
import Admin from "./pages/Admin";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // const key = localStorage.getItem("key");

  const { isAuth } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch({ type: SET_ADMIN, payload: token });
  }, [token, dispatch]);

  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <BounceLoader
            css={`
              margin: auto;
            `}
            size={60}
            color="#DD4FCE"
          />
        </div>
      }
    >
      <BrowserRouter>
        <Switch>
          {isAuth && <Route path="/admin" component={Admin} />}
          <AuthRoute exact path="/" component={Login} />
          <AuthRoute exact path="/forgot" component={Forgot} />
          <Route exact path="/change/:id" component={Change} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
