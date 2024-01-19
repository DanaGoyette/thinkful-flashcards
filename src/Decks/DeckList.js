import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import DeckInfo from "./DeckInfo";
import { listDecks } from "../utils/api";
import { AddButton } from "../Layout/Buttons";

export default function DeckList() {
  const [decks, setDecks] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    listDecks(controller.signal).then((result) => {
      setDecks(result);
    });
    return () => controller.abort();
  }, [refresh]);

  const onDelete = () => {
    setRefresh((oldVal) => oldVal + 1);
  };

  const handleCreateDeck = () => {
    history.push("/decks/new");
  };

  return (
    <div className="flexColumn">
      <div className="flexRowStart">
        <AddButton onClick={handleCreateDeck} title="Add Deck" />
      </div>
      {decks.map((deck, num) => {
        return (
          <DeckInfo
            key={num}
            deck={deck}
            showBorder
            showView
            showCount
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}
