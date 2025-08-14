import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { login } from "../api/userApi";


export function LoginForm({ setIsLogged, setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                setIsLogged(true);
                setToken(tokenAuth);
            }
        }
    }

    //Handle password change

    return (
        <>
            <Box>
                <TextField
                    required
                    id="userBox"
                    label="Username"
                    value={username}
                    onChange={onUsernameChange}
                />
                <TextField
                    type="password"
                    required
                    id="passBox"
                    label="Password"
                    value={password}
                    onChange={onPasswordChange}
                />
                <Button
                    onClick={onLogin}
                >
                    LOGIN
                </Button>
            </Box>
        </>
    )
}