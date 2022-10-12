import React, { useState } from "react"
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"
import nookies from "nookies"
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
import { auth, db } from "../firebase"
import { verifyIdToken } from "../firebase-admin"

export default function Home({ todosProps }) {
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
        <TodoList todosProps={todosProps} />
      </Container>
    </TodoContext.Provider>
  )
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const { email } = token
    const collectionRef = collection(db, "todos")
    const q = query(
      collectionRef,
      where("email", "==", email),
      orderBy("timestamp", "desc")
    )
    const querySnapshot = await getDocs(q)
    let todos = []
    querySnapshot.forEach((doc) => {
      todos.push({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().timestamp.toDate().getTime(),
      })
    })
    return {
      props: {
        todosProps: JSON.stringify(todos) || [],
      },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}
