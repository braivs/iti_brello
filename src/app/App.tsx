import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    createTheme,
    IconButton,
    LinearProgress,
    StyledEngineProvider,
    Theme,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Menu} from '@mui/icons-material'
import {TodolistsList} from '../features/TodolistsList'
import {useSelector} from 'react-redux'
import {appActions} from '../features/Application'
import {Route, Routes} from 'react-router-dom'
import {authActions, authSelectors, Login} from '../features/Auth'
import {selectIsInitialized, selectStatus} from '../features/Application/selectors'
import {useActions} from '../utils/redux-utils'
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
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
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        if (!demo) {
            initializeApp()
        }
    }, [])

    const logoutHandler = useCallback(() => {
        logout()
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
                <div className="App">
                    <ErrorSnackbar/>
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
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App