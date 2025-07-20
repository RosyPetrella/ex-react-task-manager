import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

export default function TaskDetail() {
  const { id } = useParams(); // prendo l'id dalla rotta
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const task = tasks.find((t) => t.id === Number(id));
  const [showEditModal, setShowEditModal] = useState(false);

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
  async function handleSave(updatedTask) {
    try {
      await updateTask(updatedTask);
      alert("Task aggiornato con successo!");
      setShowEditModal(false);
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

      <button onClick={handleDelete}>Elimina Task</button>
      <button onClick={() => setShowEditModal(true)}>Modifica Task</button>

      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleSave}
      />
    </div>
  );
}
