import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container, createMuiTheme,
    IconButton,
    LinearProgress, makeStyles,
    ThemeProvider,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";
import {HashRouter, Route, Routes} from 'react-router-dom';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
    root: {
        // some CSS that access to theme
    }
});

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>

    }

    return (
        <ThemeProvider theme={theme}>
            <HashRouter>
                <div className="App">
                    <ErrorSnackbars/>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6">
                                News
                            </Typography>
                            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                        </Toolbar>
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                    <Container fixed>
                        <Routes>
                            <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                            <Route path={'/login'} element={<Login/>}/>
                        </Routes>
                    </Container>
                </div>
            </HashRouter>
        </ThemeProvider>
    )
}

export default App;

// todo: upgrade to new material UI
