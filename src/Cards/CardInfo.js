import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";
import { DeleteButton, EditButton } from "../Layout/Buttons";

/**
 * This component shows the common information for a card, including
 * buttons to edit or delete the card.
 * @param {Object} param0
 * @param {{id: number, deckId: number, front: string, back: string}} param0.card
 * @param {React.MouseEventHandler<HTMLButtonElement>} param0.onDelete
 */
export default function CardInfo({ card, onDelete }) {
  const history = useHistory();
  const handleEdit = () => {
    history.push(`/decks/${card.deckId}/cards/${card.id}/edit`);
  };

  const handleDelete = () => {
    const prompt = ["Delete this card?", "You will not be able to recover it."];
    if (window.confirm(prompt.join("\r\n\r\n"))) {
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
