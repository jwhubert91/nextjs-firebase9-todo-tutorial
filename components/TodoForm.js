import React, { useContext, useRef, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../firebase"
import { TodoContext } from "../todoContext"
import { useAuth } from "../Auth"

const TodoForm = ({ setIsPending }) => {
  const { showAlert, todo, setTodo } = useContext(TodoContext)
  const inputAreaRef = useRef()
  const { currentUser } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)
    if (todo?.hasOwnProperty("timestamp")) {
      // update todo
      const docRef = doc(db, "todos", todo.id)
      const todoUpdated = { ...todo, timestamp: serverTimestamp() }
      updateDoc(docRef, todoUpdated)
      setTodo({ title: "", detail: "" })
      showAlert("info", `Todo with id ${todo.id} updated`)
    } else {
      // add new todo
      await addDoc(collection(db, "todos"), {
        ...todo,
        timestamp: serverTimestamp(),
        email: currentUser.email,
      }).then(() => {
        showAlert("success", `Todo "${todo.title}" successfully added`)
        setTodo({
          title: "",
          detail: "",
        })
      })
    }
    setIsPending(false)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setTodo({ title: "", detail: "" })
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [])

  return (
    <div
      style={{
        padding: "20px 10px",
        border: "1px solid blue",
      }}
      ref={inputAreaRef}
    >
      <pre>{JSON.stringify(todo)}</pre>
      <TextField
        fullWidth
        style={{
          background: "white",
          padding: "5px",
        }}
        label="title"
        margin="normal"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <TextField
        fullWidth
        style={{
          background: "white",
          padding: "5px",
        }}
        label="detail"
        multiline
        maxRows={4}
        value={todo.detail}
        onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
      />
      <Button sx={{ mt: 1 }} variant="contained" onClick={handleSubmit}>
        {todo.hasOwnProperty("timestamp") ? "Update todo" : "Create todo"}
      </Button>
    </div>
  )
}

export default TodoForm
