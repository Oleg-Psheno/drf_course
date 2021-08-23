import React from "react";



class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '',
            'link': '',
            'users':[]
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUsersChange(event){
        if (!event.target.selectedOptions){
            this.setState({'users':[]})
            return;
        }
        let users = []
        for (let i=0; i < event.target.selectedOptions.length; i++){
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({'users':users})
    }

    handleSubmit(event){
        console.log(this.state.name)
        console.log(this.state.link)
        console.log(this.state.users)
        this.props.createProject(this.state.name, this.state.link, this.state.users)
        event.preventDefault();
    }

    render () {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                <input type="text" name="link" placeholder="link" value={this.state.link} onChange={(event)=>this.handleChange(event)} />
                {/*<input type="text" name="users" placeholder="users" value={this.state.users} onChange={(event)=>this.handleChange(event)} />*/}
                <select multiple name="users" onChange={(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((user)=> <option value={user.id}>{user.username}</option>)}</select>

                <input type="submit" value="Отправить" />
            </form>
      );

    }
}


export default ProjectForm