import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";

import "./App.css";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";

const cache = {};

async function getData(p) {
  try {
    let page = "" + p;
    if (cache[page]) {
      return cache[page];
    }
    let res = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=4`
    );
    let data = await res.json();
    cache[page] = data;
    return data;
  } catch {
    return null;
  }
}
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
            return <Main history={history} page={page} getData={getData} />;
          }}
        />
        <Route path="/" render={() => <Redirect to="/1" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
