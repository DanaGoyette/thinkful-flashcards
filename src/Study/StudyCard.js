import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { AddButton, FlipButton, NextButton } from "../Layout/Buttons";
import classNames from "../utils/class-names";

export default function StudyCard({ deck }) {
  const history = useHistory();
  const cards = deck ? deck.cards : null;

  const [cardNum, setCardNum] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleAddCard = () => {
    history.push(`/deck/${deck.id}/cards/new`);
  };

  const handleNext = () => {
    setFlipped(false);
    if (cardNum < cards.length - 1) {
      setCardNum(cardNum + 1);
    } else {
      if (
        window.confirm(
          "Restart cards?\r\n\r\nClick Cancel to return to the home page.",
        )
      ) {
        setCardNum(0);
      } else {
        history.push("/");
      }
    }
  };

  const handleFlip = () => {
    setFlipped((val) => !val);
  };

  if (!cards) {
    return null;
  }

  if (cards.length < 3) {
    return (
      <div className="border">
        <h3>Not enough cards.</h3>
        <span>You need at least 3 cards to study.</span>
        <span>
          {cards.length === 1
            ? `There is 1 card in this deck.`
            : `There are ${cards.length} cards in this deck.`}
        </span>
        <AddButton title="Add Card" onClick={handleAddCard} />
      </div>
    );
  }

  const card = cards[cardNum];

  return (
    <div
      className={classNames({
        flexColumn: true,
        front: !flipped,
        back: flipped,
      })}
    >
      <h3>{`Card ${cardNum + 1} of ${cards.length}`}</h3>
      <span>{flipped ? card.back : card.front}</span>
      <div className="flexRowStart">
        {flipped ? (
          <NextButton onClick={handleNext} />
        ) : (
          <FlipButton onClick={handleFlip} />
        )}
      </div>
    </div>
  );
}
