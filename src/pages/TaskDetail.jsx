import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export default function TaskDetail() {
  const { id } = useParams(); // prendo l'id dalla rotta
  const { tasks } = useContext(GlobalContext);

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) return <p>Task non trovato</p>;

  function handleDelete() {
    console.log("Elimino task");
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
