import React from "react";
import { render } from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { getToken } from "./token";

import { Provider, Client, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

const cache = cacheExchange({});

const client = new Client({
  url: `http://localhost:4000`,
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" }
    };
  },
  exchanges: [dedupExchange, cache, fetchExchange]
});

render(
  <Router>
    <Provider value={client}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
