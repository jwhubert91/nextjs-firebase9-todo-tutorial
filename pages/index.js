import { Container } from "@mui/material"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"

export default function Home() {
  return (
    <Container maxWidth="sm">
      <TodoForm />
      <TodoList />
    </Container>
  )
}
