import React from "react";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import Message from "../models/Message";
import DialogModel from "../models/DialogModel";

interface DialogProps {
    dialogId: string | undefined
}

interface DialogState {
    messageText: string,
    webSocket: Stomp.Client,
    dialog: DialogModel | null
}

class Dialog extends React.Component<DialogProps, DialogState> {
    constructor(props: DialogProps) {
        super(props);
        let me = this;


        let socket = new SockJS("http://localhost:8080/ws");
        let stompClient = Stomp.over(socket);
        stompClient.connect({}, function () {
            // setConnected(true);
            stompClient.subscribe("/chat/dialog/" + me.props.dialogId, function (message: Message) {
                me.updateChat(message.body)
                // let mess = JSON.parse(message.body);
                // showMessage(mess.sender + ': ' + mess.text);
            })
        })

        this.state = {
            messageText: "",
            webSocket: stompClient,
            dialog: null
        }
        // this.state.webSocket.onmessage = function (msg) { me.updateChat(msg); };
        // this.state.webSocket.onclose = function () { alert("WebSocket connection closed") };

        this.updateChat = this.updateChat.bind(this);
        this.onMessageInput = this.onMessageInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        let me = this;
        console.log("here")

        fetch("http://localhost:8080/dialog/" + this.props.dialogId, {
            method: "GET"
        }).then(function (resp) {
            resp.json()
                .then(function (data) {
                    console.log(data)
                    me.setState({dialog: data})
                })
        })
    }

    // connect() {
    //     let me = this;
    //     console.log("Trying to connect");
    //     let socket = new SockJS("/ws");
    //     let stompClient = Stomp.over(socket);
    //     stompClient.connect({}, function () {
    //         // setConnected(true);
    //         stompClient.subscribe("/chat/dialog/" + me.props.dialogId, function (message: MessageEvent) {
    //             me.updateChat(message)
    //             // let mess = JSON.parse(message.body);
    //             // showMessage(mess.sender + ': ' + mess.text);
    //         })
    //     })
    // }

    updateChat(msg: string) {
        if (document.getElementById("chat") == null) return;
        if (document.getElementById("chat") != null) {
            // @ts-ignore
            document.getElementById("chat").insertAdjacentHTML("afterbegin", "<p>" + msg + "</p>");
        }
    }

    onMessageInput(e: React.ChangeEvent<HTMLInputElement>) {
        let me = this;
        me.setState({messageText: e.target.value})
    }

    render() {
        return (
            <div>
                <div>{this.props.dialogId}</div>
                <input id="message" placeholder="Type your message" onInput={this.onMessageInput}
                       value={this.state.messageText}/>
                <button id="send" onClick={this.sendMessage}>Send</button>
                <div id="chat">
                    {/*{this.state.dialog?.messages}*/}
                    {this.state.dialog?.messages.map((message) => (
                        <div>[{message.firstName}]: {message.textContext}</div>
                    ))}
                </div>
            </div>
        );
    }

    private sendMessage() {
        if (this.state.messageText !== "") {
            this.state.webSocket.send("/app/dialog/" + this.props.dialogId, {}, this.state.messageText)
            this.setState({messageText: ""})
        }
    }
}

export default Dialog;
