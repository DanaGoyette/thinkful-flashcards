import React from "react";
import { useHistory } from "react-router-dom";
import classNames from "../utils/class-names";
import { deleteDeck } from "../utils/api";
import {
  AddButton,
  DeleteButton,
  EditButton,
  StudyButton,
  ViewButton,
} from "../Layout/Buttons";

// non-breaking space to preserve the height while text hasn't loaded
const NBSP = "\u00A0";

/**
 * This component shows information about a given deck, with optional buttons
 * to edit the deck, view the deck, study the deck, delete the deck, or add a card.
 *
 * This module handles the main action of the buttons, but 
 * the caller is responsible for what happens after the deck is deleted.
 * @typedef {{id: number, deckId: number, front: string, back: string}} Card
 * @param {Object} param0
 * @param {{id: number, name: string, description: string, cards: Card[]}} param0.deck
 * @param {boolean=} param0.border
 * @param {boolean=} param0.showCount
 * @param {boolean=} param0.showView
 * @param {boolean=} param0.showEdit
 * @param {boolean=} param0.showAddCard
 * @param {() => void=} param0.onDelete
 */
export default function DeckInfo({
  deck,
  border,
  showCount,
  showView,
  showEdit,
  showAddCard,
  onDelete,
}) {
  const history = useHistory();

  // handle plurals to avoid saying "1 cards"
  const cardCount = !deck || !deck.cards ? 0 : deck.cards.length;
  const cardCountStr = cardCount === 1 ? "1 card" : `${cardCount} cards`;

  const handleDelete = () => {
    const prompt = ["Delete this deck?", "You will not be able to recover it."];
    if (window.confirm(prompt.join("\r\n"))) {
      deleteDeck(deck.id);
      if (onDelete) onDelete();
    }
  };

  const handleView = () => {
    history.push(`/decks/${deck.id}`);
  };

  const handleEdit = () => {
    history.push(`/decks/${deck.id}/edit`);
  };

  const handleStudy = () => {
    history.push(`/decks/${deck.id}/study`);
  };

  const handleAddCard = () => {
    history.push(`/decks/${deck.id}/cards/new`);
  };

  return (
    <div className={classNames({ flexColumn: true, border: border })}>
      <div className="flexRow">
        <h2 style={{ flexGrow: 1 }}>{deck.name || NBSP}</h2>
        {showCount && <span className="cardCount">{cardCountStr}</span>}
      </div>
      <div>{deck.description || NBSP}</div>
      <div className="flexRow">
        {showView && <ViewButton onClick={handleView} />}
        <StudyButton onClick={handleStudy} />
        {showEdit && <EditButton onClick={handleEdit} />}
        {showAddCard && <AddButton onClick={handleAddCard} title="Add Card" />}
        <div className="flexSpacer" />
        <DeleteButton onClick={handleDelete} />
      </div>
    </div>
  );
}
