import ReactDOM from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
  children,
}) {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div>
      <div>
        <h2>{title}</h2>
        <div>{children}</div>
        <div>
          <button onClick={onClose}>Annulla</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
