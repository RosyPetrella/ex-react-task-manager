import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {
  const { id } = useParams(); // prendo l'id dalla rotta
  const { tasks, removeTask } = useContext(GlobalContext);
  const navigate = useNavigate();

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

      <button onClick={handleDelete}>Elimina Task</button>
    </div>
  );
}
