import ActorParticipation from "./ActorParticipation";
import Dialog from "../components/Dialog";
import {UUID} from "crypto";

class Message {
    // id: UUID
    // dialog: Dialog
    textContext: String
    firstName: String


    constructor(textContext: String, firstName: String) {
        this.textContext = textContext;
        this.firstName = firstName;
    }

// constructor(id: UUID, dialog: Dialog, textContext: String, actorParticipation: ActorParticipation) {
    //     this.id = id;
    //     this.dialog = dialog;
    //     this.textContext = textContext;
    //     this.actorParticipation = actorParticipation;
    // }
}

export default Message;