import React, { useContext, useState } from "react"
import { TextField, Button } from "@mui/material"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { TodoContext } from "../todoContext"

const TodoForm = ({ setIsPending }) => {
  const [todo, setTodo] = useState({ title: "", detail: "" })
  const { showAlert } = useContext(TodoContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)
    await addDoc(collection(db, "todos"), {
      ...todo,
      timestamp: serverTimestamp(),
    }).then(() => {
      showAlert("success", `Todo "${todo.title}" successfully added`)
      setTodo({
        title: "",
        detail: "",
      })
      setIsPending(false)
    })
  }
  return (
    <div
      style={{
        padding: "20px 10px",
        border: "1px solid blue",
        borderRadius: "10px",
      }}
    >
      <pre>{JSON.stringify(todo)}</pre>
      <TextField
        fullWidth
        label="title"
        margin="normal"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <TextField
        fullWidth
        label="detail"
        multiline
        maxRows={4}
        value={todo.detail}
        onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
      />
      <Button sx={{ mt: 1 }} variant="contained" onClick={handleSubmit}>
        Add new todo
      </Button>
    </div>
  )
}

export default TodoForm
