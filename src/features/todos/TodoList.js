import { useQuery, useMutation, useQueryClient } from "react-query"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../api/todosApi"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react'

const ToDoList = () => {
    const [newTodo, setNewTodo] = useState('')
    const queryClient = useQueryClient()
    
    const {
        isLoading,
        isError,
        error,
        data: todos
    } = useQuery('todos', getTodos, {
        select: data => data.sort((a, b) => b.id - a.id)
    })
    
    const addTodoMutation = useMutation(addTodo, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    const updateTodoMutation = useMutation(updateTodo, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })

    const deleteTodoMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            // Invalidates cache and refetch 
            queryClient.invalidateQueries("todos")
        }
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false })
        setNewTodo('')
    }

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter a new todo item</label>
            <div className="new-todo">
                <input
                    type="text"
                    id="new-todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter new todo"
                />
            </div>
            <button className="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    )

  return (
    <div>ToDoList</div>
  )
}

export default ToDoList