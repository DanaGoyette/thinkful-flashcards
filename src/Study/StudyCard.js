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
    if (cardNum < cards.length - 1) {
      setCardNum(cardNum + 1);
      setFlipped(false);
    } else {
      const prompt = [
        "Restart cards?",
        "Click Cancel to return to the home page.",
      ];
      if (window.confirm(prompt.join("\r\n\r\n"))) {
        setCardNum(0);
        setFlipped(false);
      } else {
        history.push("/");
      }
    }
  };

  const handleFlip = () => {
    setFlipped((val) => !val);
  };

  if (!cards || cards.length < 3) {
    const cardCount = cards ? cards.length : 0;
    const cardCountStr =
      cardCount === 1
        ? `There is 1 card in this deck.`
        : `There are ${cardCount} cards in this deck.`;
    return (
      <div className="border">
        <h3>Not enough cards.</h3>
        <span>You need at least 3 cards to study.</span>
        <span>{cardCountStr}</span>
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
