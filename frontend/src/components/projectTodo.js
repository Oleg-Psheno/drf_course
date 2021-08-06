import React from "react";
import {useParams} from 'react-router-dom'


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

const ProjectTodoList = ({todos}) => {
    let { id } = useParams();
    let filtered_todos = todos.filter((todo) => todo.project === parseInt(id))


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
            {filtered_todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )
}


export default ProjectTodoList