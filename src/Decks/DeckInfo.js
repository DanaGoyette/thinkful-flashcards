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

export default function DeckInfo({
  deck,
  showBorder,
  showCount,
  showView,
  showEdit,
  showAddCard,
  onDelete,
}) {
  const history = useHistory();

  const cardCountStr =
    !deck || !deck.cards
      ? "0 cards"
      : deck.cards.length === 1
        ? "1 card"
        : `${deck.cards.length} cards`;

  const handleDelete = () => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
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
    <div className={classNames({ flexColumn: true, border: showBorder })}>
      <div className="flexRow">
        <h2 style={{ flexGrow: 1 }}>{deck.name}</h2>
        {showCount && <span className="cardCount">{cardCountStr}</span>}
      </div>
      <div>{deck.description}</div>
      <div className="flexRow">
        <div className="flexRow">
          {showView && <ViewButton onClick={handleView} />}
          <StudyButton onClick={handleStudy} />
          {showEdit && <EditButton onClick={handleEdit} />}
          <AddButton onClick={handleAddCard} title="Add Card" />
        </div>
        <DeleteButton onClick={handleDelete} />
      </div>
    </div>
  );
}
