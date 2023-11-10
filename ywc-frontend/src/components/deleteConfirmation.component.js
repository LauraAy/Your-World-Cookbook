import React, { useState, Fragment, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteConfirmation = ({ openDialog, closeDialog, confirmDialog, type, message, text}) => {
	return (
		<Box>
			<Dialog
				open={openDialog}
				onClose={closeDialog}
				type={type}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{message}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{text}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog}>Cancel</Button>
					<Button onClick={confirmDialog} color="error" autoFocus>
						Confirm Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default DeleteConfirmation