import React from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from 'axios';

//create the friends here
//send back to the api

class Friends extends React.Component {
    state = {
        friends: [],
        newFriend: {
            id: Date.now(),
            name: '',
            age: '',
            email: ''
        }
    };

    componentDidMount(){
        this.getFriends();
    }

    getFriends = () => {
        axiosWithAuth()
        .get("/api/friends")
        .then(response => {
            // console.log( "response withing friends api call: ", response.data)
            this.setState({
                friends: response.data
            })
        })
        .catch(error => console.log({error}))
    }

    handleChanges = event => {
        this.setState({
            ...this.state,
            newFriend: { ...this.state.newFriend,
                [event.target.name]: event.target.value
            }
        })
        console.log("new Friend: ",this.state.newFriend);
    }

    handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
        .post('/api/friends', this.state.newFriend)
        .then(response => {
            console.log(response)
        }
        )
    }

    render() {
        // console.log("Our State in FriendsList: ",this.state);
        return (
            <div>Your Friend List: 
                <div>{this.state.friends.map(friend => {
                    return<h4>{friend.name}</h4>
                })}</div>

            <form onSubmit = {this.handleSubmit}>
                Add a new Friend
                <label htmlFor = 'name'> Name: 
                    <input name = "name" id = 'name' value = {this.state.newFriend.name} type = 'text' onChange = {this.handleChanges}/>
                </label>
                <label htmlFor = 'age'> Age: 
                    <input name = "age" id = 'age' value = {this.state.newFriend.age} type = 'text' onChange = {this.handleChanges}/>
                </label>
                <label htmlFor = 'email'> Name: 
                    <input name = "email" id = 'email' value = {this.state.newFriend.email} type = 'text' onChange = {this.handleChanges}/>
                </label>
                <button type='submit'>Add</button>
            </form>

            </div>
        )
    }

}

export default Friends;