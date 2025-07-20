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

  async function addTask(newTask) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();

      if (data.success) {
        setTasks((prevTasks) => [...prevTasks, data.task]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta del task:", error);
    }
  }

  async function removeTask(taskId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTasks((prevTask) => prevTask.filter((task) => task.id !== taskId));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del task:", error);
      throw error;
    }
  }

  function updateTask() {}

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
  };
}
