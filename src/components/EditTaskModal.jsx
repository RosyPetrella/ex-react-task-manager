import { useRef, useState, useEffect } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To do");
  const [description, setDescription] = useState("");
  const editFormRef = useRef();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setStatus(task.status || "To do");
      setDescription(task.description || "");
    }
  }, [task]);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      status,
    };

    onSave(updatedTask); // Passa l'oggetto aggiornato al padre
  }
  if (!show) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={() => editFormRef.current?.requestSubmit()}
      title="Modifica Task"
      confirmText="Salva"
      content={
        <form ref={editFormRef} onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titolo"
          />
          <textarea
            placeholder="Descrizione"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </form>
      }
    />
  );
}
