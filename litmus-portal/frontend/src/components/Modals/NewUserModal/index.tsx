import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import checkmark from '../../../assets/icons/checkmark.svg';
import copy from '../../../assets/icons/copy.svg';
import useStyles from './styles';

const NewUserModal: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        data-cy="button"
        variant="contained"
        className={classes.button}
        onClick={() => {
          setOpen(true);
        }}
      >
        Save
      </Button>
      <Modal
        data-cy="modal"
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <div className={classes.body}>
            <img src={checkmark} alt="checkmark" />
            <div className={classes.text}>
              <Typography className={classes.typo} align="center">
                A new user was <strong>successfully created </strong>
              </Typography>
            </div>
            <div className={classes.text1}>
              <Typography className={classes.typo1}>
                A new user was successfully created.Now information about it
                will be displayed on the user management screen of the
                application. You can copy the credentials and share it with the
                respective user.
              </Typography>
            </div>
            <div className={classes.copyDiv}>
              <img src={copy} alt="copy" />
              <Typography>Copy the credentials </Typography>
            </div>
            <Button
              data-cy="closeButton"
              variant="contained"
              className={classes.buttonModal}
              onClick={handleClose}
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default NewUserModal;
