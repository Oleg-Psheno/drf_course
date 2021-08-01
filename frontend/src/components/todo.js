import React from "react";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.author}
            </td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table>
            <th>
                id
            </th>
            <th>
                text
            </th>
            <th>
                project
            </th>
            <th>
                author
            </th>
            {todos.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}

export default TodoList