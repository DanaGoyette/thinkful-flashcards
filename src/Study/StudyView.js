import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumbs from "../Layout/Breadcrumbs";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";

/**
 * This component is used for studying the flashcards.
 */
export default function StudyView() {
  const { deckId } = useParams();
  const location = `/decks/${deckId}`;

  const [deck, setDeck] = useState({ id: deckId, name: "" });
  const [err, setErr] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    if (deckId) {
      readDeck(deckId, controller.signal)
        .then((result) => setDeck(result))
        .catch((err) => setErr(err.message));
    } else {
      setErr("Invalid Deck ID");
    }
    return () => controller.abort();
  }, [deckId]);

  if (err) {
    return (
      <div className="flexColumn">
        <Breadcrumbs path={[{ title: `Deck ${deckId}`, location }, "Study"]} />
        <h2>{`Study: Deck ${deckId}`}</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  return (
    <div className="flexColumn">
      <Breadcrumbs path={[{ title: deck.name, location }, "Study"]} />
      <h2>{`Study: ${deck.name}`}</h2>
      {deck.cards && <StudyCard deck={deck} />}
    </div>
  );
}
