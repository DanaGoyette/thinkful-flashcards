import React from "react";

/**
 * This component is the shared form for creating a new deck or editing an existing one.
 * The caller is responsible for specifying the behaviors of the buttons.
 * @param {Object} param0
 * @param {{id: number, name: string, description: string}} param0.deck
 * @param {React.ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement=} param0.handleChange
 * @param {React.FormEventHandler<HTMLFormElement>=} param0.handleSubmit
 * @param {React.MouseEventHandler<HTMLButtonElement>=} param0.handleCancel
 * @returns
 */
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
        onChange={handleChange}
        value={deck.name}
      />
      <label htmlFor="deckDescription">Description</label>
      <textarea
        id="deckDescription"
        name="description"
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
