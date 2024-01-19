import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index.js";
import CardForm from "./CardForm.js";
import Breadcrumbs from "../Layout/Breadcrumbs.js";

/**
 * This component is used to create a new card on an existing deck.
 * Defined here: data, actions, breadcrumbs, heading.
 * Defined in CardForm: form, label, input, textarea, button.
 */
export default function CardCreate() {
  const history = useHistory();
  const { deckId } = useParams();
  const initialDeck = { id: deckId };
  const initialCard = {
    id: undefined,
    deckId,
    front: "",
    back: "",
  };
  const location = `/decks/${deckId}`;

  const [deck, setDeck] = useState(initialDeck);
  const [card, setCard] = useState(initialCard);
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
    // When pressing Submit, clear the form, but stay here
    event.preventDefault();
    createCard(deckId, card);
    setCard(initialCard);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  if (err) {
    const title = `Deck ${deckId}`;
    return (
      <div className="flexColumn">
        <Breadcrumbs path={[{ title, location }, "Add Card"]} />
        <h2>{`${title}: Add Card`}</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  const title = deck.name;
  return (
    <div className="flexColumn">
      <Breadcrumbs path={[{ title, location }, "Add Card"]} />
      <h2>{`${title}: Add Card`}</h2>
      <CardForm
        card={card}
        handleChange={handleChange}
        cancelLabel="Done"
        submitLabel="Save"
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
