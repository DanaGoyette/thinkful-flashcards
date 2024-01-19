import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "../Layout/Breadcrumbs";
import DeckForm from "./DeckForm";

export default function DeckEdit() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({
    id: deckId,
    name: "",
    description: "",
    cards: [],
  });
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    readDeck(deckId, controller.signal)
      .then((result) => setDeck(result))
      .catch((err) => setErr(err.message));
  }, [deckId]);

  const handleChange = (event) => {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(deck).then((deckResult) => {
      history.push(`/decks/${deckResult.id}`);
    });
  };

  const handleCancel = () => {
    history.back();
  };

  if (err) {
    return (
      <div className="flexColumn">
        <Breadcrumbs path={`Deck ${deck.name}`} />
        <h2>{`Editing Deck ${deckId}`}</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  return (
    <div className="flexColumn">
      <Breadcrumbs path={`Deck ${deck.name}`} />
      <h2>Edit Deck</h2>
      <DeckForm
        deck={deck}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
