import React from "react";

const TodoItem = ({todo, users}) => {
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
                {users.find((user) => user.id===todo.author).username}

                {/*{todo.author}*/}
            </td>
        </tr>
    )
}

const TodoList = ({todos, users}) => {
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
            {todos.map((todo) => <TodoItem todo={todo} users={users} />)}
        </table>
    )
}

export default TodoList