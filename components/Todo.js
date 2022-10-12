import React, { useContext, useEffect } from "react"
import * as dayjs from "dayjs"
import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import { TodoContext } from "../todoContext"
import { useRouter } from "next/router"

const Todo = ({ id, timestamp, title, detail }) => {
  const jsTimestamp = new Date(timestamp)

  const { showAlert, setTodo } = useContext(TodoContext)
  const router = useRouter()

  const deleteTodo = async (id, e) => {
    e.stopPropagation()
    const docRef = doc(db, "todos", id)
    await deleteDoc(docRef).then(() => {
      showAlert("error", `The todo with id ${id} was deleted successfully`)
    })
  }

  const seeMore = (id, e) => {
    e.stopPropagation()
    router.push(`/todos/${id}`)
  }

  return (
    <ListItem
      onClick={() =>
        setTodo({
          title,
          detail,
          timestamp,
          id,
        })
      }
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA", cursor: "pointer" }}
      secondaryAction={
        <>
          <IconButton onClick={(e) => deleteTodo(id, e)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={(e) => seeMore(id, e)}>
            <MoreVertIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={title}
        secondary={jsTimestamp.toDateString()}
        style={{
          color: "black",
        }}
      />
    </ListItem>
  )
}

export default Todo
