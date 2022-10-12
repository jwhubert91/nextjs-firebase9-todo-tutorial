import React, { useState } from "react"
import { Container, Snackbar, Alert } from "@mui/material"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import { TodoContext } from "../todoContext"

export default function Home() {
  const [todo, setTodo] = useState({ title: "", detail: "" })
  const [isPending, setIsPending] = useState(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")

  const showAlert = (type, message) => {
    setAlertType(type)
    setAlertMessage(message)
    setIsSnackbarOpen(true)
  }

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return
    }
    setIsSnackbarOpen(false)
  }

  return (
    <TodoContext.Provider value={{ showAlert, todo, setTodo }}>
      <Container maxWidth="sm" sx={{ paddingTop: 1, paddingBottom: 5 }}>
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <>
            <TodoForm setIsPending={setIsPending} />
            <Snackbar
              open={isSnackbarOpen}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity={alertType}
                sx={{ width: "100%" }}
              >
                {alertMessage}
              </Alert>
            </Snackbar>
            <TodoList />
          </>
        )}
      </Container>
    </TodoContext.Provider>
  )
}
