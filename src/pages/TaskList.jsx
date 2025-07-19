import TaskRow from "../components/TaskRow";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Stato</th>
              <th>Data di Creazione</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                id={task.id}
                title={task.title}
                status={task.status}
                createdAt={task.createdAt}
                description={task.description}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
