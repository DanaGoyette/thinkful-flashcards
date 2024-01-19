import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";
import Breadcrumbs from "../Layout/Breadcrumbs";

// non-breaking space to preserve the height while text hasn't loaded
const NBSP = "\u00A0";

/**
 * This component is used to edit an existing card on a deck.
 * Defined here: data, actions, breadcrumbs, heading.
 * Defined in CardForm: form, label, input, textarea, button.
 */
export default function CardEdit() {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const location = `/decks/${deckId}`;
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
    history.goBack();
  };

  if (err) {
    const title = `Deck ${deckId}`;
    return (
      <div className="flexColumn">
        <Breadcrumbs path={[{ title, location }, `Edit Card ${cardId}`]} />
        <h2>{`Editing card ${cardId}`}</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  const title = deck.name;
  return (
    <div className="flexColumn">
      <Breadcrumbs path={[{ title, location }, `Edit Card ${cardId}`]} />
      <h2>{title ? `${title}: Edit Card` : NBSP}</h2>
      <CardForm
        card={card}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        submitLabel="Submit"
      />
    </div>
  );
}
