import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm.js";
import Breadcrumbs from "../Layout/Breadcrumbs";

export default function CardCreate() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ id: deckId });
  const [card, setCard] = useState({ deckId, front: "", back: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    if (deckId) {
      readDeck(deckId, controller.signal)
        .then((deckResult) => setDeck(deckResult))
        .catch((err) => setErr(err.message));
    } else {
      setErr("Invalid Deck ID");
    }
    return () => controller.abort();
  }, [deckId]);

  const handleChange = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, card).then(() => {
      history.push(`/decks/${deckId}`);
    });
  };

  const handleCancel = () => {
    history.back();
  };

  if (err) {
    return (
      <div className="flexColumn">
        <h2>Add Card</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  return (
    <div className="flexColumn">
      <Breadcrumbs
        path={[
          { title: deck.name || deckId, location: `/decks/${deckId}` },
          "Add Card",
        ]}
      />
      <CardForm
        card={card}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
