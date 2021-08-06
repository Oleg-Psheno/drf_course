import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Link,HashRouter} from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

class Menu extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <HashRouter>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li><Link to='/todo'>Todo</Link></li>
                    </HashRouter>

                </ul>
            </nav>
        )
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Menu/>
    </React.StrictMode>,
    document.getElementById('menu')
);

class Footer extends React.Component {
    render() {
        return (<h2>Footer</h2>)
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Footer/>
    </React.StrictMode>,
    document.getElementById('footer')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
