import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";
import { useContext, useState, useMemo, useCallback } from "react";
import React from "react";
export default function TaskList() {
  const { tasks } = useContext(GlobalContext);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSort(column) {
    if (sortBy === column) {
      // se clicco la stessa colonna, inverto l’ordine
      setSortOrder(sortOrder * -1);
    } else {
      // altrimenti cambio colonna e resetto l’ordine a crescente
      setSortBy(column);
      setSortOrder(1);
    }
  }

  const sortedTasks = useMemo(() => {
    const statusOrder = {
      "To do": 0,
      Doing: 1,
      Done: 2,
    };

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery)
    );

    const sorted = [...filtered].sort((a, b) => {
      let compare = 0;

      if (sortBy === "title") {
        compare = a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        compare = statusOrder[a.status] - statusOrder[b.status];
      } else if (sortBy === "createdAt") {
        compare =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return compare * sortOrder;
    });

    return sorted;
  }, [tasks, sortBy, sortOrder, searchQuery]);

  const handleSearchChange = useCallback(() => {
    let timer;
    return (e) => {
      const value = e.target.value;

      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchQuery(value.toLowerCase());
      }, 300);
    };
  }, [])();

  return (
    <>
      <div>
        <input
          className="mt-3 mb-2 ms-3"
          type="text"
          placeholder="Cerca per nome..."
          onChange={handleSearchChange}
        />
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>
                Titolo {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("status")}>
                Stato {sortBy === "status" ? (sortOrder === 1 ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("createdAt")}>
                Data creazione{" "}
                {sortBy === "createdAt" ? (sortOrder === 1 ? "▲" : "▼") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <TaskRow key={task.id} {...task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
