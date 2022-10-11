import React from "react"
import * as dayjs from "dayjs"
import { ListItem, ListItemText } from "@mui/material"

const Todo = ({ todo }) => {
  const { id, timestamp, title, detail } = todo
  const jsTimestamp = timestamp.toDate()
  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA" }}
    >
      <ListItemText
        primary={title}
        secondary={dayjs(jsTimestamp).format("MMMM D, YYYY")}
      />
    </ListItem>
  )
}

export default Todo
