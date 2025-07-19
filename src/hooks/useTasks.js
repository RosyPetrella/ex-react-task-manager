import { useEffect, useState } from "react";

export default function useTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log("Task caricati:", data);
      })
      .catch((err) => console.error("Errore fetch task", err));
  }, []);

  function addTask() {}

  function removeTask() {}

  function updateTask() {}

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
  };
}
