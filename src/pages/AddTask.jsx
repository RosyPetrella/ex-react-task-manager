import { useState, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
export default function AddTask() {
  const { addTask } = useContext(GlobalContext);

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();
  const [errore, setErrore] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setErrore("Campo obbligatorio");
      return;
    }

    if (title.split("").some((char) => symbols.includes(char))) {
      setErrore("Il titolo non può contenere simboli speciali");
      return;
    }

    setErrore(null);

    const task = {
      title: title.trim(),
      description: descriptionRef.current.value,
      status: statusRef.current.value,
    };

    console.log("Nuovo task:", task);

    try {
      await addTask(task);
      alert("Task aggiunto con successo!");

      // Reset form
      setTitle("");
      descriptionRef.current.value = "";
      statusRef.current.value = "To do";
    } catch (error) {
      alert("Errore: " + error.message);
    }
  }

  return (
    <>
      <h2> Aggiungi nuovo task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Titolo"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea name="description" id="" ref={descriptionRef}></textarea>
        <select name="status" id="" ref={statusRef}>
          <option value="To do">To do</option>
          <option value="Doion">Doing</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">Aggiungi Task</button>
      </form>
    </>
  );
}
