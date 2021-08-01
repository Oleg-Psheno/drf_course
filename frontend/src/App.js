import logo from './logo.svg';
import './App.css';
import React from "react";
import UserList from "./components/user";
import ProjectList from "./components/projects";
import TodoList from "./components/todo";
import axios from "axios";
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'

const Page404 = ({location}) => {
    return <div>Страница {location.pathname} не найдена</div>
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users.results
                    })
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects.results
                    })
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos.results
                    })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route component={Page404} />
                        <Redirect from='/users' to='/' />
                    </Switch>

                </HashRouter>
            </div>

        )
    }

}

export default App;
