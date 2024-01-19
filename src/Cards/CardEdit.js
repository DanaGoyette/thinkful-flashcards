import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";
import Breadcrumbs from "../Layout/Breadcrumbs";

export default function CardEdit() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ id: deckId });
  const [card, setCard] = useState({ id: cardId, deckId, front: "", back: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    if (deckId) {
      readDeck(deckId, controller.signal)
        .then((deckResult) => setDeck(deckResult))
        .catch((err) =>
          setErr(`Error retrieving deck ${deckId}: ${err.message}`),
        );
      readCard(cardId, controller.signal)
        .then((cardResult) => setCard(cardResult))
        .catch((err) =>
          setErr(`Error retrieving card ${cardId}: ${err.message}`),
        );
    } else {
      setErr("Invalid Deck ID");
    }
    return () => controller.abort();
  }, [deckId, cardId]);

  const handleChange = (event) => {
    setCard({
      ...card,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(card).then(() => {
      history.push(`/decks/${deckId}`);
    });
  };

  const handleCancel = () => {
    history.back();
  };

  if (err) {
    return (
      <div className="flexColumn">
        <h2>Edit Card</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  return (
    <div className="flexColumn">
      <Breadcrumbs
        path={[
          { title: deck.name || deckId, location: `/decks/${deckId}` },
          `Edit card ${cardId}`,
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
