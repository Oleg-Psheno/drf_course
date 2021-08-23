import './App.css';
import React from "react";
import UserList from "./components/user";
import ProjectList from "./components/projects";
import ProjectTodoList from "./components/projectTodo";
import TodoList from "./components/todo";
import ProjectForm from "./components/projectForm";
import LoginForm from './components/LoginForm'
import axios from "axios";
import {HashRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import Cookies from "universal-cookie";

const Page404 = ({location}) => {
    return <div>Страница {location.pathname} не найдена</div>
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    get_token_from_storage() {
        const cookie = new Cookies()
        this.setState({'token': cookie.get('token')}, this.get_data)
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
        }
        const cookie = new Cookies()

        headers['Authorization'] = 'Token ' + cookie.get('token')
        return headers
    }

    get_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users.results
                    })
            })
            .catch(error => {
                this.setState({'users': []})
                console.log(error)
            })

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects.results
                    })
            })
            .catch(error => {
                this.setState({'projects': []})
                console.log(error)
            })

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos.results
                    })
            })
            .catch(error => {
                this.setState({'todos': []})
                console.log(error)
            })

    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {'username': login, 'password': password})
            .then(response => {
                localStorage.setItem('token', response.data.token)
                const cookie = new Cookies()
                cookie.set('token', response.data.token)
                console.log(cookie.get('token'))
                this.setState({'token': response.data.token}, this.get_data)
            })
            .catch(error => console.log(error))
    }

    is_authenticated() {
        return !!this.state.token
    }

    logout() {
        const cookie = new Cookies()
        cookie.set('token', '')
        this.setState({'token': ''}, this.get_data)
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(
                response => {
                    this.get_data()
                }).catch(error => {
            console.log(error)
        })
    }

    createProject(name, link, users) {
        if (!name || !link || users.length==0){
            console.log("нет параметров")
            return;
        }
        const headers = this.get_headers()
        const data = {name: name, link: link, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`,data, {headers})
            .then(response =>{this.get_data()})
            .catch(error => {console.log(error)})
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'>Users</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/todo'>Todo</Link></li>
                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm
                            users = {this.state.users}
                            createProject={(name,link,users)=>this.createProject(name,link,users)}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList
                            projects={this.state.projects}
                            deleteProject={(id) => this.deleteProject(id)}
                        />}/>
                        <Route exact path='/todo'
                               component={() => <TodoList todos={this.state.todos} users={this.state.users}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(login, password) => this.get_token(login, password)}/>}/>
                        <Route exact path='/project/:id'>
                            <ProjectTodoList todos={this.state.todos}/>
                        </Route>
                        <Redirect from='/users' to='/'/>
                        <Route component={Page404}/>
                    </Switch>

                </HashRouter>
            </div>

        )
    }

}

export default App;
