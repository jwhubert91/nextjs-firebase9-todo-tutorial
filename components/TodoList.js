import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, query, onSnapshot } from "firebase/firestore"
import Todo from "./Todo"

const TodoList = () => {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    const q = query(collection(db, "todos"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const results = []
      querySnapshot.forEach((doc) => {
        const docData = doc.data()
        const newTodo = {
          id: doc.id,
          timestamp: docData.timestamp,
          ...docData,
        }
        results.push(newTodo)
      })
      setTodos(results)
    })
    return unsubscribe
  }, [])
  return (
    <div>
      <h1>NextJS Firebase9 Todo List</h1>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          detail={todo.detail}
          timestamp={todo.timestamp}
        />
      ))}
    </div>
  )
}

export default TodoList
