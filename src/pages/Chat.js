import React, { Component } from "react";
import Header from "../components/Header";
import RichTextEditor from '../components/RichTextEditor'
//import RichTextEditor from 'react-rte';
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import { TOOLBARCONFIG } from '../helpers/constant';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      //content: RichTextEditor.createEmptyValue(),
      readError: null,
      writeError: null,
      loadingChats: false,
      //value: RichTextEditor.createEmptyValue()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      let users = [];
      db.ref("users").on("value", snapshot => {
        snapshot.forEach((snap) => {
          users.push({
            email: snap.val().email,
            name: snap.val().name,
            uid: snap.val().uid,
          });
        });
      });

      //cargar chats
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          const myUser = users.filter(x => x.uid === snap.val().uid);
          const nameDisplay = (myUser.length > 0)
            ? myUser[0].name
            : "anonimo";
          //chats.push(snap.val());
          chats.push({
            content: snap.val().content,
            timestamp: snap.val().timestamp,
            uid: snap.val().uid,
            status: snap.val().status,
            deleted: snap.val().deleted,
            id: snap.key,
            name: nameDisplay
          })
        });
        //ordenar chats
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content.toString('html'),
        timestamp: Date.now(),
        uid: this.state.user.uid,
        status: 'ok',
        deleted: false
      });

      this.setState({ content: RichTextEditor.createEmptyValue() });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  /**
   * TODO: en lugar de borrar, cambiar estado a deleted
   * @param {hash string} id 
   */
  async handleDelete(id) {
    try {
      let chatRef = db.ref('chats/' + id);
      chatRef.remove()

    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const chatTime = new Date(timestamp);
    const year = chatTime.getFullYear();
    let month = chatTime.getMonth() + 1;
    let day = chatTime.getDate();

    let hours = chatTime.getHours();
    let minutes = chatTime.getMinutes();
    let seconds = chatTime.getSeconds();

    if (day < 10) { day = "0" + day; }
    if (month < 10) { month = "0" + month; }
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    const time = `${day}/${(month)}/${year} ${hours}:${minutes}:${seconds}`;
    return time;
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  onChange = (value) => {
    this.setState({
      content: value
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="chat-area" ref={this.myRef}>
          {/* loading indicator */}
          {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> : ""}

          {/* chat area */}
          {this.state.chats.map(chat => {
            return <p key={chat.timestamp} className={"chat-bubble " + (this.state.user.uid === chat.uid ? "current-user" : "")}>
              <span className="chat-user float-left">{chat.name}</span>
              <button className="btn btn-link chat-act float-right" title="Archive">
                <i className="material-icons ">archive</i>
              </button>
              {this.state.user.uid === chat.uid &&
                <button className="btn btn-link chat-act float-right" title="Delete" onClick={() => this.handleDelete(chat.id)}>
                  <i className="material-icons ">delete_outline</i>
                </button>
              }
              <br />
              <div dangerouslySetInnerHTML={{ __html: chat.content }} />
              {/*chat.content*/}
              
              <span className="chat-time float-right">{this.formatTime(chat.timestamp)}</span>
            </p>
          })}
        </div>

        {/* Send Form */}
        <form onSubmit={this.handleSubmit} className="mx-3">
          <div className="contentSend">          
            <RichTextEditor />
            {/*
            <RichTextEditor
              toolbarConfig={TOOLBARCONFIG}
              value={this.state.content}
              onChange={this.onChange}
            />
            */}
            {/*
            <textarea className="form-control" name="content" 
              onChange={this.handleChange} value={this.state.content}></textarea>
            */}
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button type="submit" className="btn btn-submit px-4 btcontentSend">
              <i className="material-icons">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}