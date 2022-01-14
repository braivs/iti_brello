import React, {SyntheticEvent} from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {setAppErrorAC} from '../../app/app-reducer';
import Alert from '@mui/material/Alert';

export function ErrorSnackbars() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setAppErrorAC(null))
    };

    const handleCloseSnackbar = (event: Event | SyntheticEvent<Event>, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        handleClose()
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}
