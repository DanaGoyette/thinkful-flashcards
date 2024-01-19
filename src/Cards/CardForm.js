import React from "react";

export default function CardForm({
  card,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  return (
    <form onSubmit={handleSubmit} className="flexColumn">
      <label htmlFor="cardFront">Front</label>
      <textarea
        id="cardFront"
        name="front"
        placeholder="Front of Card"
        onChange={handleChange}
        value={card.front}
      />
      <label htmlFor="cardBack">Back</label>
      <textarea
        id="cardBack"
        name="back"
        placeholder="Back of Card"
        onChange={handleChange}
        value={card.back}
      />
      <div className="flexRowStart">
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit" className="submitButton">
          Submit
        </button>
      </div>
    </form>
  );
}
