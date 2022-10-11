import React, { useContext } from "react"
import * as dayjs from "dayjs"
import { IconButton, ListItem, ListItemText } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"
import { TodoContext } from "../todoContext"

const Todo = ({ todo }) => {
  const { id, timestamp, title, detail } = todo
  const jsTimestamp = timestamp?.toDate()

  const { showAlert } = useContext(TodoContext)

  const deleteTodo = async (id, e) => {
    e.stopPropagation()
    const docRef = doc(db, "todos", id)
    await deleteDoc(docRef).then(() => {
      showAlert("error", `The todo with id ${id} was deleted successfully`)
    })
  }
  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA" }}
      secondaryAction={
        <>
          <IconButton onClick={(e) => deleteTodo(id, e)}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={title}
        secondary={dayjs(jsTimestamp).format("MMMM D, YYYY")}
      />
    </ListItem>
  )
}

export default Todo
