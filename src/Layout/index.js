import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckCreateView from "../Decks/DeckCreateView";
import DeckEditView from "../Decks/DeckEditView";
import DeckListView from "../Decks/DeckListView";
import DeckView from "../Decks/DeckView";
import CardEditView from "../Cards/CardEditView";
import CardCreateView from "../Cards/CardCreateView";
import StudyView from "../Study/StudyView";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <DeckCreateView />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardCreateView />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId">
            <CardEditView />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyView />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEditView />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route path="/decks">
            <Redirect to="/" />
          </Route>
          <Route path="/" exact>
            <DeckListView />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
