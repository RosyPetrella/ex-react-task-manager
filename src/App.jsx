import { BrowserRouter, Route, Link, NavLink, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <nav>
            <NavLink to="/">Lista Task</NavLink>
            <NavLink to="/add">Aggiungi Task</NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/add" element={<AddTask />}></Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
