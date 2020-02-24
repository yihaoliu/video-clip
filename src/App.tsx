import * as React from "react";
import {
  Switch,
  Redirect,
  NavLink
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { router, NestedRoute, StatusRoute} from "./router";
import "./assets/app.css";

class App extends React.Component {
  public render() {
    return (
      <div>
        <Helmet>
          <title>This is App page</title>
          <meta name="keywords" content="React SSR" />
        </Helmet>
        <div className="view">
          <Switch>
            {
              router.map((route, i) =>
                <NestedRoute key={i} {...route} />
              )
            }
            <Redirect from="/" to="/bar" exact={true} />
            <StatusRoute code={404}>
              <div>
                <h1>404</h1>
              </div>
            </StatusRoute>
           
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
