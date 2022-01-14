import React, {SyntheticEvent} from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import {useDispatch, useSelector} from 'react-redux';
import Alert from '@mui/material/Alert';
import {AppRootStateType} from "../../utils/types";
import {useActions} from "../../utils/redux-utils";
import {appActions} from "../../features/CommonActions/App";

export function ErrorSnackbar() {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const {setAppError} = useActions(appActions)

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setAppError({error: null}))
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