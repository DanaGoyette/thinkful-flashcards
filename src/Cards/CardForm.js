import React from "react";

/**
 * This component is the common form for creating a new card or editing an existing one.
 * The caller is responsible for specifying the behavior and text of the
 * @param {Object} param0
 * @param {{id: number, deckId: number, front: string, back: string}} param0.card
 * @param {string=} param0.cancelLabel
 * @param {string=} param0.submitLabel
 * @param {React.ChangeEventHandler<HTMLTextAreaElement>=} param0.handleChange
 * @param {React.MouseEventHandler<HTMLButtonElement>=} param0.handleCancel
 * @param {React.FormEventHandler<HTMLFormElement>=} param0.handleSubmit
 */
export default function CardForm({
  card,
  handleChange,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  handleCancel,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit} className="flexColumn">
      <label htmlFor="cardFront">Front</label>
      <textarea
        id="cardFront"
        name="front"
        onChange={handleChange}
        value={card.front}
      />
      <label htmlFor="cardBack">Back</label>
      <textarea
        id="cardBack"
        name="back"
        onChange={handleChange}
        value={card.back}
      />
      <div className="flexRowStart">
        {handleCancel && <button onClick={handleCancel}>{cancelLabel}</button>}
        {handleSubmit && <button type="submit">{submitLabel}</button>}
      </div>
    </form>
  );
}
