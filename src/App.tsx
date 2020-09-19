import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "&store/store";
import { Button, Row, ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";
import { History } from "history";

import "./App.css";
import "antd/dist/antd.css";
import { PrivateRoute } from "&route/protectedRoute";

// TODO remove demo routes
import { HomeComponent } from "&features/demo/home/home.component";
import { LandingComponent } from "&features/demo/landing/landing.component";
import { LoginComponent } from "&features/demo/login/login.component";

type ReduxProps = ConnectedProps<typeof connector>;
type AppProps = {
  /** Browser history for routing */
  history: History<any>;
};

const App = (props: AppProps & ReduxProps) => {
  const { history, isAuthenticated } = props;
  const { i18n } = useTranslation();

  /** This useEffect rerenders dir */
  useEffect(() => {}, [i18n.language]);

  return (
    /* This wrapper handles rtl and ltr directions for i18n */
    <ConfigProvider direction={i18n.dir()}>
      <Router history={history}>
        {/* App main routing switch */}
        <Switch>
          {/* TODO remove the coming demo routes and add your's */}
          <Route exact path="/" component={LandingComponent} />
          <Route exact path="/login" component={LoginComponent} />
          <PrivateRoute
            exact
            path="/home"
            component={HomeComponent}
            isAuthenticated={isAuthenticated}
          />

          {/* TODO This block handles unmatched routes. Add your custom 404 component */}
          <Route path="/404" render={() => <div>page not found</div>} />
          <Redirect to="/404" />
        </Switch>
      </Router>
      {/* This block is for changing language */}
      <Row justify={"center"}>
        <Button onClick={() => i18n.changeLanguage("en")}>en</Button>
        <Button onClick={() => i18n.changeLanguage("ar")}>ar</Button>
      </Row>
    </ConfigProvider>
  );
};

/**
 * Maps state variables from redux store to props of currect component
 * @param state
 */
const mapStateToProps = (state: RootState) => ({
  // TODO change this to your real auth validator
  isAuthenticated: state.login.isLoggedIn,
});

/**
 * Maps actions from slices to props
 */
const mapDispatchToProps = {};

/**
 * Connects component to redux store
 */
const connector = connect(mapStateToProps, mapDispatchToProps);
const AppRedux = connector(App);

export { AppRedux as App };
