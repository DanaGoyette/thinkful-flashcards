import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";
import { DeleteButton, EditButton } from "../Layout/Buttons";

export default function CardInfo({ card, onDelete }) {
  const history = useHistory();
  const handleEdit = () => {
    history.push(`/decks/${card.deckId}/cards/${card.id}/edit`);
  };

  const handleDelete = () => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      deleteCard(card.id);
      if (onDelete) onDelete();
    }
  };

  return (
    <div className="border flexColumn">
      <div className="flexRow">
        <div>{card.front}</div>
        <div>{card.back}</div>
      </div>
      <div className="flexRowEnd">
        <EditButton onClick={handleEdit} />
        <DeleteButton onClick={handleDelete} />
      </div>
    </div>
  );
}
