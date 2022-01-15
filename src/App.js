import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";
import Admin from "./pages/admin/admin";
import NotFound from "./pages/404";

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
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Switch>
  );
};

export default App;
