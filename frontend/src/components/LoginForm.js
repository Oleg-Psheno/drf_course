import React from "react";
import axios from "axios";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'login': [],
            'password': []
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.get_token(this.state.login,this.state.password);
    }

    render () {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input type="text" name="login" placeholder="login" value={this.state.login} onChange={(event)=>this.handleChange(event)} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(event)=>this.handleChange(event)} />
                <input type="submit" value="Login" />
            </form>
      );

    }
}


export default LoginForm