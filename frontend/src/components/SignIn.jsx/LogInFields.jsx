import { 
    Box, 
    Button,
    Checkbox, 
    FormControlLabel, 
    Grid, 
    Link, 
    TextField, 
    Typography 
} from "@mui/material";

const LogInFields = ({ handleFieldChange, handleSubmit }) => {
    const log_in_field_style = {
        parent_box: {
            display: "flex",
            alignItems: "center",
            height: "100vh"
        },
        title: {
            mb: 2
        },
        remember_checkbox: {
            '&.Mui-checked': {
                color: '#9c7a63',
            },
        },
        log_in_button: {
            bgcolor: "#2196f3",
            borderRadius: 10,
            textTransform: "none",
            py: 1,
            ":hover": {
                bgcolor: "#9c7a63"
            }
        },
        sign_up_link: {
            color: "inherit",
        }
    }

    return (
        <Box sx={log_in_field_style.parent_box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h3" color={"#2196f3"} sx={log_in_field_style.title}>
                        Start learning now
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
                            sx={log_in_field_style.log_in_button}
                            onClick={handleSubmit}
                            fullWidth
                        >
                            Log in
                        </Button>
                </Grid>

                <Grid item xs={12}>
                        <Typography variant="body1">
                            Not on our site yet? {" "}
                            <Link 
                                href="/sign-up"
                                underline="always"
                                sx={log_in_field_style.sign_up_link}
                            >
                                Create an account
                            </Link>
                        </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default LogInFields;