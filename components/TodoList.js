import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore"
import Todo from "./Todo"
import { useAuth } from "../Auth"

const TodoList = ({ todosProps }) => {
  const [todos, setTodos] = useState([])
  const { currentUser } = useAuth()
  useEffect(() => {
    setTodos(JSON.parse(todosProps))
  }, [])
  useEffect(() => {
    const todosRef = collection(db, "todos")
    const q = query(
      todosRef,
      where("email", "==", currentUser?.email),
      orderBy("timestamp", "desc")
    )
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
  console.log(todos)
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
