import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../Layout/Breadcrumbs";
import DeckForm from "./DeckForm";

/**
 * This component is the page for creating a new deck.
 * Defined here: data, actions, breadcrumbs, heading.
 * Defined in DeckForm: form, label, input, textarea, button.
 */
export default function DeckCreate() {
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "", description: "", cards: [] });

  const handleChange = (event) => {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(deck).then((deckResult) => {
      history.push(`/decks/${deckResult.id}`);
    });
  };

  const handleCancel = () => {
    history.back();
  };

  return (
    <div className="flexColumn">
      <Breadcrumbs path={"Create Deck"} />
      <h2>Create Deck</h2>
      <DeckForm
        deck={deck}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
