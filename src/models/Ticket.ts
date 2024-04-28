import {UUID} from "crypto";

class Ticket {
    id: UUID


    constructor(id: UUID) {
        this.id = id;
    }
}

export default Ticket