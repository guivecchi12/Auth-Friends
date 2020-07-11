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
        axiosWithAuth().get('/friends')
        .then(response => {
            console.log({ response })
            this.setState({
                friends: response.data
            })
        })
        .catch(error => console.log({error}))
    }

    handleChanges = event => {
        this.setState({
            ...this.state,
            newFriend: {
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/friends', this.state.newFriend)
        .then(response => console.log(response))
    }

    render() {
        console.log("Our State in FriendsList: ",this.state);
        return (
            <div>You made it!</div>
        )
    }

}

export default Friends;