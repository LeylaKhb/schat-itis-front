import {useParams} from "react-router-dom";
import Dialog from "./Dialog";

export const DialogFunc = () => {
    const { id } = useParams();

    return (
        <div>
            <Dialog dialogId={id} />
        </div>
    )
}