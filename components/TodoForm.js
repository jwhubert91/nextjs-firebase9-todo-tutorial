import React, { useState } from "react"
import { TextField, Button } from "@mui/material"

const TodoForm = () => {
  const [todo, setTodo] = useState({ title: "", detail: "" })
  return (
    <div>
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
      <Button sx={{ mt: 1 }} variant="contained">
        Add new todo
      </Button>
    </div>
  )
}

export default TodoForm
