import React from "react";
import DialogModel from "../models/DialogModel";
import {Link} from "react-router-dom";

interface DialogsProps {
}

interface DialogsState {
    dialogs: DialogModel[]
}

class AllDialogs extends React.Component<DialogsProps, DialogsState> {

    constructor(props: DialogsProps) {
        super(props);
        this.state = {
            dialogs: []
        }
    }

    componentDidMount() {
        let me = this
        fetch("http://localhost:8080/dialogs", {
            method: "GET"
        }).then(function (resp ) {
            resp.json()
                .then(function (data) {
                    me.setState({dialogs: data})
                })
        })
    }

    render() {
        return (
            <div>
                {this.state.dialogs.map((value, index) => (
                    <Link to={"/dialog/" + value.id}>{index}</Link>
                ))}
                <Link to="/new_dialog">New dialog</Link>

            </div>
        )
    }
}

export default AllDialogs;