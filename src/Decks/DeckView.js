import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { readDeck } from "../utils/api";

import DeckInfo from "./DeckInfo";
import CardInfo from "../Cards/CardInfo";
import Breadcrumbs from "../Layout/Breadcrumbs";

export default function DeckView() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [err, setErr] = useState(null);
  // increment this to force a refresh
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    readDeck(deckId, controller.signal)
      .then((result) => setDeck(result))
      .catch((err) => setErr(err.message));
    return () => controller.abort();
  }, [deckId, refresh]);

  const onDeleteDeck = () => history.replace("/");
  const onDeleteCard = () => setRefresh((num) => num + 1);

  if (err) {
    return (
      <div className="flexColumn">
        <h2>{`Deck ${deckId}`}</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  return (
    <div className="flexColumn">
      <Breadcrumbs path={`Deck ${deck.name}`} />
      <DeckInfo
        deck={deck}
        showEdit
        showStudy
        showAddCard
        showDelete
        onDelete={onDeleteDeck}
      />
      {deck.cards && deck.cards.length > 0 && (
        <div className="flexColumn">
          <h2>Cards</h2>
          {deck.cards.map((card) => (
            <CardInfo key={card.id} card={card} onDelete={onDeleteCard} />
          ))}
        </div>
      )}
    </div>
  );
}
