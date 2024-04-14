import { useEffect, useState } from "react";
import { 
    Box, 
    Container, 
    CssBaseline, 
    Grid, 
} from "@mui/material";
// Firebase stuff
import { useAuthState } from "react-firebase-hooks/auth";
// Page navigator
import { useNavigate } from "react-router";
// Sign Up Fields
import SignUpFields from "./SignUpFields";
import { auth, registerWithEmailAndPassword } from "../../firebase";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const handleFieldChange = (event) => {
        event.preventDefault();
        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        if (user) navigate("/sign-up/onboarding")
    }, [user, navigate])

    const sign_up_style = {
        parent_grid: {
            height: "100vh"
        },
        sign_up_field_parent_box: {
            display: "flex",
            alignItems: "center",
            height: "100vh"
        } 
    }

    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={sign_up_style.sign_up_field_parent_box}>
                    <SignUpFields 
                        handleFieldChange={handleFieldChange} 
                        handleSubmit={handleSubmit}
                    />
                </Box>
            </Container>
        </Box>
    )
}

export default SignUp;