import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { login } from "../api/userApi";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


export function LoginForm({ setIsLogged, setToken }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usError, setUsError] = useState(false)
    const [pssError, setPssError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    //Handle username change
    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const onLogin = async () => {
        //Call APIs for login
        if (username != '' && password != '') {
            let userCredentials = {
                'username': username,
                'password': password
            }
            let tokenAuth = await login(userCredentials);
            if (tokenAuth != null) {
                setIsLogged(true)
                setToken(tokenAuth)
            } else {
                setUsError(true)
                setPssError(true)
                setErrorMsg("Incorrect credentials")
            }
        } else {
            if (username == '') setUsError(true)
            else setUsError(false)
            if (password == '') setPssError(true)
            else setPssError(false)
            setErrorMsg("Missing credentials")
        }
    }

    //Handle password change

    return (
        <>
            <Container >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 4, 
                        borderRadius: 4,
                        boxShadow: 4,
                    }}
                >
                    <Typography>
                        Welcome to the Supplier System
                    </Typography>
                        <TextField
                            required
                            id="userBox"
                            label="Username"
                            value={username}
                            onChange={onUsernameChange}
                            margin="normal"
                            error={usError}
                        />
                        <TextField
                            type="password"
                            required
                            id="passBox"
                            label="Password"
                            value={password}
                            onChange={onPasswordChange}
                            margin="normal"
                            error={pssError}
                        />
                        {
                            errorMsg != '' ? <Typography margin="normal" color={"error"} variant="caption">
                                {errorMsg}
                            </Typography> : <></>
                        }
                        <Button
                            onClick={onLogin}
                            variant="contained"
                            margin="normal"
                        >LOGIN</Button>
                </Box>

            </Container>


        </>
    )
}