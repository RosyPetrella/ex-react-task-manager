import { createContext, useState, useEffect } from "react";
import useTask from "../hooks/useTasks";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const { tasks, addTask, removeTask, updateTask } = useTask();

  return (
    <GlobalContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </GlobalContext.Provider>
  );
}
