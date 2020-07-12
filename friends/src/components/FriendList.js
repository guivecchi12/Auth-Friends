import React from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from 'axios';
import { response } from 'express';

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
        },
        deleteFriend: ''
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
        // console.log("new Friend: ",this.state.newFriend);
    }

    handleChanges = event => {
        this.setState({
            ...this.state,
            deleteFriend: event.target.value 
        })
        // console.log("new Friend: ",this.state.newFriend);
    }

    handleSubmit = event => {
        event.preventDefault();
        axiosWithAuth()
        .post('/api/friends', this.state.newFriend)
        .then(response => {
            this.setState({
                friends: response.data,
                newFriend: {
                    id: Date.now(),
                    name: '',
                    age: '',
                    email: ''
                }
            })
        })
    }

    removeFriend = event => {
        event.preventDefault();

        console.log("Friends: ", this.state.friends)

        let id = 0;
        this.state.friends.forEach(friend => {
            if(friend.name === this.state.deleteFriend){
                id = friend.id;
                axiosWithAuth()
                .delete(`/api/friends/${id}`)
                .then(res => {
                    console.log(res);
                })
            };
        })

        console.log(id);
    }

    render() {
        // console.log("Our State in FriendsList: ", this.state);
        return (
            <div className = "Friends">Your Friend List: 
                <div>{this.state.friends.map(friend => {
                    return(
                    <div>
                        <h4>{friend.name}</h4>
                        <h7>age: {friend.age}</h7>
                        <h7> email: {friend.email}</h7>
                    </div>    
                        
                        )
                })}</div>

            <form onSubmit = {this.handleSubmit}>
                <div className="add" >Add a new Friend</div>
                <label htmlFor = 'name'> Name:
                    <input name = "name" id = 'name' value = {this.state.newFriend.name} type = 'text' onChange = {this.handleChanges}/>
                </label>
                <label htmlFor = 'age'> Age: 
                    <input name = "age" id = 'age' value = {this.state.newFriend.age} type = 'text' onChange = {this.handleChanges}/>
                </label>
                <label htmlFor = 'email'> Email: 
                    <input name = "email" id = 'email' value = {this.state.newFriend.email} type = 'text' onChange = {this.handleChanges}/>
                </label>
                <button type='submit'>Add</button>
            </form>
            <form onSubmit = {this.removeFriend}>
                <div className = "remove"> Remove a Friend </div>
                <label htmlFor = 'name'> Name:
                    <input name = "name" id = 'name' value = {this.state.deleteFriend} type = 'text' onChange = {this.handleChanges}/>
                </label>
                <button type = 'submit'> Remove </button>
            </form>
                
            </div>
        )
    }

}

export default Friends;