import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import DeckInfo from "./DeckInfo";
import { listDecks } from "../utils/api";
import { AddButton } from "../Layout/Buttons";

/**
 * This component shows a list of existing decks, using a DeckInfo for each one.
 */
export default function DeckListView() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  const [err, setErr] = useState("");

  // This 'refresh' variable is a simple way to force a refresh afer deleting a deck.
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    listDecks(controller.signal)
      .then((result) => setDecks(result))
      .catch((err) => setErr(err.message));
    return () => controller.abort();
  }, [refresh]);

  const handleCreateDeck = () => history.push("/decks/new");
  const onDelete = () => setRefresh((num) => -num);

  if (err) {
    return (
      <div className="flexColumn">
        <h2>Decks</h2>
        <h3>{err}</h3>
      </div>
    );
  }

  return (
    <div className="flexColumn">
      <div className="flexRowStart">
        <AddButton onClick={handleCreateDeck} title="Create Deck" />
      </div>
      {decks.map((deck, num) => (
        <DeckInfo
          key={num}
          deck={deck}
          border
          showView
          showCount
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
