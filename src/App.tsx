import React from "react";
import "~/src/App.css";
import { Route, Switch } from "wouter";
import Sim from "~/src/features/sim/Sim";
import Nav from "~/src/features/nav/Nav";
import Team from "~/src/features/team/Team";
import Importer from "~/src/features/import/Importer";
import Result from "~/src/features/result/Results";

function App() {
  return (
    <div className=".bp3-dark mx-auto h-full">
      <Nav />
      <Switch>
        <Route path="/" component={Team} />
        <Route path="/sim" component={Sim} />
        <Route path="/import" component={Importer} />
        <Route path="/result" component={Result} />
      </Switch>
    </div>
  );
}

export default App;
