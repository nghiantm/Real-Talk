import React from "react";
import { Navigate } from "react-router-dom";

function AuthGuard(user, loading, element) {
    if (!user && !loading) {
        return <Navigate to={"/sign-in"} replace={true} />;
    } else {
        return element;
    }
}

export default AuthGuard;