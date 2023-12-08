import { useState } from "react";

function Approve(props) {
    const [Aprrovestate, Approvechange] = useState(props.state);


    function clickhandler() {
        // fetch data put true approved  
        fetch(`${process.env.REACT_APP_API_URL}api/approve/${props.username}`, {
            method: "GET"
        }).then((res) => {
            if (res.status !== 200) {
                alert("Server Error ");
            }
            else {
                Approvechange(true);
                alert('Approved successfully.')
                window.location.reload();
            }
            }).catch((err) => {
                console.log(err.message)
            })
    }
    return (

        <div>
            <button hidden={(props.approvale || props.myrole === 'F') ? true : false} disabled={(props.approvale || props.myrole === 'F') ? 'disabled' : ''} onClick={clickhandler} className="btn btn-success">Approve</button>
        </div>
    );
}

export default Approve;