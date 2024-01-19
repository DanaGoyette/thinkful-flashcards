import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumbs from "../Layout/Breadcrumbs";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";

export default function StudyView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ id: deckId, name: "" });

  useEffect(() => {
    const controller = new AbortController();
    readDeck(deckId, controller.signal).then((result) => setDeck(result));
    return () => controller.abort();
  }, [deckId]);

  return (
    <div className="flexColumn">
      <Breadcrumbs
        path={
          deck.name
            ? [{ title: deck.name, location: `/decks/${deckId}` }, "Study"]
            : []
        }
      />
      <h1>{`Study: ${deck.name}`}</h1>
      {deck.cards && <StudyCard deck={deck} />}
    </div>
  );
}
