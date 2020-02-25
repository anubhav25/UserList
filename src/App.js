import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
//cache to store already downloaded data
const cache = {};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          path="/:page"
          render={props => {
            let page = props?.match?.params?.page;
            let history = props?.history;
            // render Main page according to page no.
            return <Main history={history} page={page} cache={cache} />;
          }}
        />
        {/* Redirect to page 1 in case of unidentified request  */}
        <Route path="/" render={() => <Redirect to="/1" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
