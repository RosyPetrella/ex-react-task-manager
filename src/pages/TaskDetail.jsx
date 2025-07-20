import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";

export default function TaskDetail() {
  const { id } = useParams(); // prendo l'id dalla rotta
  const { tasks, removeTask } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) return <p>Task non trovato</p>;

  async function handleDelete() {
    try {
      await removeTask(task.id);
      alert("Task eliminato con successo!");
      navigate("/"); // Reindirizza alla lista dei task
    } catch (error) {
      alert("Errore: " + error.message);
    }
  }

  return (
    <div>
      <h2>Dettaglio Task</h2>
      <p>
        <strong>Nome:</strong> {task.title}
      </p>
      <p>
        <strong>Descrizione:</strong> {task.description}
      </p>
      <p>
        <strong>Stato:</strong> {task.status}
      </p>
      <p>
        <strong>Data creazione:</strong> {task.createdAt}
      </p>

      <button onClick={() => setShowModal(true)}>Elimina Task</button>

      <Modal
        show={showModal}
        title="Conferma Eliminazione"
        content={<p>Sei sicuro di voler eliminare questa task?</p>}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        confirmText="Elimina"
      />
    </div>
  );
}
