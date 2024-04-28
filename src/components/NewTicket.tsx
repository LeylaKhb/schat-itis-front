export const NewTicket = () => {
    function createDialog() {
        fetch("http://localhost:8080/create", {
            method: "POST"
        }).then(function (resp) {
            resp.text()
                .then(function (data) {
                    window.location.assign("http://localhost:3000/dialog/" + data);
            })
        })
    }

    return (
        <div>
            <button onClick={createDialog}>Create dialog</button>
        </div>
    )
}