import React, { useState } from "react"
import {
  Container,
  Snackbar,
  Alert,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import { TodoContext } from "../todoContext"
import { useAuth } from "../Auth"
import { auth } from "../firebase"

export default function Home() {
  const { currentUser } = useAuth()
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <IconButton onClick={() => auth.signOut()}>
            <Avatar src={currentUser.photoURL} />
          </IconButton>
          <Typography variant="h5">{currentUser.displayName}</Typography>
        </Box>
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
      </Container>
    </TodoContext.Provider>
  )
}
