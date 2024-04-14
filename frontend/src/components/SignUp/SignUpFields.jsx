import { 
    Button, 
    Grid, 
    Link, 
    TextField, 
    Typography
} from "@mui/material";

const SignUpFields = ({ handleFieldChange, handleSubmit }) => {
    const sign_up_field_style = {
        title: {
            mb: 2,
        },
        sign_up_button: {
            bgcolor: "#2196f3",
            borderRadius: 10,
            textTransform: "none",
            py: 1,
            ":hover": {
                bgcolor: "#9c7a63"
            }
        },
        log_in_link: {
            color: "inherit"
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                    <Typography variant="h3" color={"#2196f3"} sx={sign_up_field_style.title}>
                        Sign up for Real Talk
                    </Typography>
            </Grid>

            <Grid item xs={10}>
                    <Typography variant="body2">
                        Email
                    </Typography>

                    <TextField 
                        variant="outlined"
                        size="small"
                        id="email"
                        type="email"
                        onChange={handleFieldChange}
                        fullWidth
                    />
            </Grid>

            <Grid item xs={10}>
                    <Typography variant="body2">
                        Password
                    </Typography>

                    <TextField 
                        variant="outlined"
                        size="small"
                        id="password"
                        type="password"
                        onChange={handleFieldChange}
                        fullWidth
                    />
            </Grid>

            <Grid item xs={4}>
                    <Button
                        variant="contained"
                        sx={sign_up_field_style.sign_up_button}
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Sign up
                    </Button>
            </Grid>

            <Grid item xs={12}>
                    <Typography variant="body1">
                        Already on our site? {" "}
                        <Link 
                            href="/sign-in"
                            underline="always"
                            sx={sign_up_field_style.log_in_link}
                        >
                            Log in
                        </Link>
                    </Typography>
            </Grid>
        </Grid>
    )
}

export default SignUpFields;