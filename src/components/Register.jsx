import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            to: '/'
        }
    }

    handleRegister = event => {
        event.preventDefault();
        // console.log(event);

        // Check that passwords match
        let password = event.target.password.value;
        let confirmPass = event.target.confirmPass.value;
        if (password !== confirmPass){
            console.warn('Passwords do not match!');
        } else {
            console.log('These passwords do match');

            // Set up request to our Flask API - POST to /api/users
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            let formData = JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password
            })

            fetch("http://localhost:5000/api/users", {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        console.error(data.error)
                    } else {
                        console.log(data)
                        this.setState({
                            redirect: true
                        })
                    }
                })
                .catch(err => console.error(err))
        };
    };

    render() {
        return (
            <>
                {this.state.redirect ? <Navigate to='/' /> :  (
                    <>
                        <h3 className="text-center">Register</h3>
                        <form onSubmit={this.handleRegister}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className='form-control' placeholder='Enter Email' name='email' />
                                <label htmlFor="username">Username</label>
                                <input type="text" className='form-control' placeholder='Enter Username' name='username' />
                                <label htmlFor="password">Password</label>
                                <input type="password" className='form-control' placeholder='Enter Password' name='password' />
                                <label htmlFor="confirmPass">Confirm Password</label>
                                <input type="password" className='form-control' placeholder='Re-Enter Password' name='confirmPass' />
                                <input type="submit" value="Register" className='btn btn-success w-100 mt-3' />
                            </div>
                        </form>
                    </>
                )}
            </>
        )
    }
}