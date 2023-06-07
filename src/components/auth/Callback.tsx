import React from "react";
import withAuth from "./withAuth";


function Callback() {

    return <div>Authenticated</div>;
}

export default withAuth(Callback);