import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

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
    return await res.json();
  } catch {
    return null;
  }
}
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route
        path="/:page"
        render={props => {
          let page = props?.match?.params?.page;
          let history = props?.history;
          return <Main history={history} page={page} getData={getData} />;
        }}
      />
      <Route path="/" render={() => <Redirect to="/1" />} />
    </BrowserRouter>
  );
}

export default App;
