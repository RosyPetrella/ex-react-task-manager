import { useState, useRef, useContext } from "react";
export default function AddTask() {
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

  const [title, setTitle] = useState("");
  const descriptionRef = useRef();
  const statusRef = useRef();
  const [errore, setErrore] = useState(null);

  function handleSubmit(e) {
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

    setTitle("");
    descriptionRef.current.value = "";
    statusRef.current.value = "toDo";
  }

  return (
    <>
      <h2> Aggiungi nuovo task</h2>
      <form onSubmit={handleSubmit}>
        {/* Il campo non può essere vuoto.
Non può contenere simboli speciali.
Se il valore è errato, mostrare un messaggio di errore.
Utilizzare una costante con i caratteri vietati:
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/~"; */}
        <input
          type="text"
          value={title}
          placeholder="Titolo"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea name="description" id="" ref={descriptionRef}></textarea>
        <select name="status" id="" ref={statusRef}>
          <option value="toDo">To do</option>
          <option value="doing">Doing</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">Aggiungi Task</button>
      </form>
    </>
  );
}
