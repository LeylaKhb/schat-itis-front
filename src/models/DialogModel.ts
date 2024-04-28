import {UUID} from "crypto";
import Message from "./Message";
import Ticket from "./Ticket";
import ActorParticipation from "./ActorParticipation";

class DialogModel {
    id: UUID
    // ticket: Ticket
    // actorParticipations: ActorParticipation[]
    messages: Array<Message>


    constructor(id: UUID, messages: Array<Message>) {
        this.id = id;
        this.messages = messages;
    }
}

export default DialogModel;

// export default DialogModel;