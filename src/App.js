import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";
import Admin from "./pages/admin/admin";

const App = () => {
  return (
    <Switch>
      {/* <Route path="/">
        <LandingPageLayout heading="Hiền mua bàn phím đi alo">
          <HomePage />
        </LandingPageLayout>
        <Route path="/home" component={HomePage} />
      </Route> */}
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="" component={HomePage} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </Switch>
  );
};

export default App;
