import React from "react";
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`project/${project.id}`}>
                    {project.name}
                </Link>
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button type='button' onClick={()=>deleteProject(project.id)}>Удалить</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
        <table>
            <th>
                id
            </th>
            <th>
                name
            </th>
            <th>
                link
            </th>
            <th>
                users
            </th>
            <th> </th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
        <Link to='/projects/create'>Создать проект</Link>
        </div>
    )
}

export default ProjectList