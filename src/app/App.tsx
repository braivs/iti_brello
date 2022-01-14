import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    createTheme,
    IconButton,
    LinearProgress,
    ThemeProvider,
    Theme,
    StyledEngineProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Menu} from '@mui/icons-material';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";
import {HashRouter, Route, Routes} from 'react-router-dom';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

const theme = createTheme();

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
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <div className="App">
                        <ErrorSnackbars/>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton edge="start" color="inherit" aria-label="menu" size="large">
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
        </StyledEngineProvider>
    );
}

export default App;

// todo: upgrade to new material UI
