import { useState } from "react";
import TaskFrontEnd from "./components/TaskFrontEnd";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

  return (
      <TaskFrontEnd />
  )
}

export default App