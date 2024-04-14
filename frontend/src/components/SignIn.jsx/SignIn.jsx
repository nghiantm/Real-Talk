import { useEffect, useState } from "react";
import { 
    Box, 
    Container, 
    CssBaseline, 
    Grid 
} from "@mui/material";
// Firebase stuff
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// Page navigator
import { useNavigate } from "react-router-dom";
// Sign up fields
import LogInFields from "./LogInFields";
import { setProfileAsync } from "../../redux/actions/profileAction";
import { useDispatch } from "react-redux";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFieldChange = (event) => {
        event.preventDefault();
        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value)
                break;
            case 'password':
                setPassword(event.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        logInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        if (user) {
            //dispatch(setProfileAsync(user.email));
            navigate("/");
        }
    }, [user])

    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="sm">
                <LogInFields 
                    handleFieldChange={handleFieldChange} 
                    handleSubmit={handleSubmit}
                />
            </Container>
        </Box>
    )
}

export default SignIn;