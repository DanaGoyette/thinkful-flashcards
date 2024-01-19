import React from "react";

export default function DeckForm({
  deck,
  handleChange,
  handleSubmit,
  handleCancel,
}) {
  return (
    <form onSubmit={handleSubmit} className="flexColumn">
      <label htmlFor="deckName">Name</label>
      <input
        id="deckName"
        name="name"
        placeholder="Title of Deck"
        onChange={handleChange}
        value={deck.name}
      />
      <label htmlFor="deckDescription">Description</label>
      <textarea
        id="deckDescription"
        name="description"
        placeholder="Describe the topic of the deck"
        onChange={handleChange}
        value={deck.description}
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
