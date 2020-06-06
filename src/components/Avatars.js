import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { db } from "../services/firebase";

export default class GroupAvatars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            userConnect: [],
            loadingAvatars: false
        };
    }

    async componentDidMount() {
        this.setState({ loadingChats: true });
        try {
            let userConnect = [];
            db.ref("users").on("value", snapshot => {
                snapshot.forEach((snap) => {
                    userConnect.push(snap.val());
                });
            });

            this.setState({ userConnect });
            this.setState({ loadingAvatars: false });
        } catch (error) {
            this.setState({ error: error.message, loadingAvatars: false });
        }
    }

    render() {
        return (
            <div>
                {/* loading indicator */}
                {this.state.loadingAvatars ? <div className="spinner-border text-success" role="status">
                    <span className="sr-only"></span>
                </div> : ""}
                <AvatarGroup max={3}>
                {this.state.userConnect.map((user,idx) => {
                    return ( 
                        <Avatar key={idx} alt={user.name} src="/static/images/avatar/1.jpg" />
                    )
                })}
                </AvatarGroup>
            </div>
        )
    }
}