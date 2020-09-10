import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { History } from "history";

import { Counter } from "./features/counter/Counter";
import "./App.css";

type AppProps = {
  /** Browser history for routing */
  history: History<any>;
};

const App = ({ history }: AppProps) => {
  return (
    // Router connected to redux, here redux is used for navigation integrity
    <ConnectedRouter history={history}>
      {/* App main routing switch */}
      <Switch>
        <Route exact path="/login" render={() => <div>Login</div>} />
        <Route exact path="/" render={() => <div>Main</div>} />
        <Route exact path="/counter" render={() => <Counter />} />
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
