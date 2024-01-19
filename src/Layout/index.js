import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { DeckCreate, DeckEdit, DeckList, DeckView } from "../Decks";
import CardEdit from "../Cards/CardEdit";
import CardCreate from "../Cards/CardCreate";
import StudyView from "../Study/StudyView";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardCreate />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId">
            <CardEdit />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyView />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route path="/decks">
            <Redirect to="/" />
          </Route>
          <Route path="/" exact>
            <DeckList />
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
