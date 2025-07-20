import { BrowserRouter, Route, Link, NavLink, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <nav className="bg-info pt-3 pb-3">
            <NavLink className="ps-2 pe-2" to="/">
              Lista Task
            </NavLink>
            <NavLink className="ps-2 pe-2" to="/add">
              Aggiungi Task
            </NavLink>
          </nav>

          <Routes>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/add" element={<AddTask />}></Route>
            <Route path="/task/:id" element={<TaskDetail />}></Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;
