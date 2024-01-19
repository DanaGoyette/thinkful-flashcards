import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { readDeck } from "../utils/api";

import DeckInfo from "./DeckInfo";
import CardInfo from "../Cards/CardInfo";
import Breadcrumbs from "../Layout/Breadcrumbs";

/**
 * This component is used after clicking selecting "View" on a given deck in the DeckList.
 */
export default function DeckView() {
  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState({ id: deckId });
  const [err, setErr] = useState(null);

  // This 'refresh' variable is a simple way to force a refresh afer deleting a card.
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    readDeck(deckId, controller.signal)
      .then((result) => setDeck(result))
      .catch((err) => setErr(err.message));
    return () => controller.abort();
  }, [deckId, refresh]);

  const onDeleteDeck = () => history.replace("/");
  const onDeleteCard = () => setRefresh((num) => -num);

  if (err) {
    const title = deck.name || `Deck ${deckId}`;
    return (
      <div className="flexColumn">
        <Breadcrumbs path={title} />
        <h2>{title}</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  return (
    <div className="flexColumn">
      <Breadcrumbs path={deck.name} />
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
