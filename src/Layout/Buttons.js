import React from "react";

const PLUS_SIGN = "\u2795";

export function AddButton({ onClick, title = "Add" }) {
  return (
    <button onClick={onClick}>
      <span>{PLUS_SIGN}</span> <span>{title}</span>
    </button>
  );
}

export function DeleteButton({ onClick, title = "" }) {
  if (title) {
    return (
      <button onClick={onClick}>
        <span>🗑️</span> <span>{title}</span>
      </button>
    );
  } else {
    return <button onClick={onClick}>🗑️</button>;
  }
}
export function EditButton({ onClick, title = "Edit" }) {
  return (
    <button onClick={onClick}>
      <span>📝</span> <span>{title}</span>
    </button>
  );
}

export function FlipButton({ onClick, title = "Flip" }) {
  return (
    <button onClick={onClick}>
      <span>🔃</span> <span>{title}</span>
    </button>
  );
}

export function NextButton({ onClick, title = "Next" }) {
  return (
    <button onClick={onClick}>
      <span>⏩</span> <span>{title}</span>
    </button>
  );
}

export function StudyButton({ onClick, title = "Study" }) {
  return (
    <button onClick={onClick}>
      <span>📖</span> <span>{title}</span>
    </button>
  );
}

export function ViewButton({ onClick, title = "View" }) {
  return (
    <button onClick={onClick}>
      <span>👁️</span> <span>{title}</span>
    </button>
  );
}
