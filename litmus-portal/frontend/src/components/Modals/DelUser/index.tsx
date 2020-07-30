import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import bin from '../../../assets/icons/bin.svg';
import userDel from '../../../assets/icons/userDel.svg';
import useStyles from './styles';

const DelUser: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {
          setOpen(true);
        }}
        className={classes.delDiv}
        onClick={() => {
          setOpen(true);
        }}
      >
        <img src={bin} alt="delete" className={classes.bin} />
        <Typography>Delete the user </Typography>
      </div>

      <Modal
        data-cy="modal"
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <div className={classes.body}>
            <img src={userDel} alt="lock" />
            <div className={classes.text}>
              <Typography className={classes.typo} align="center">
                Are you sure
                <strong> to remove the current user?</strong>
              </Typography>
            </div>
            <div className={classes.text1}>
              <Typography className={classes.typo1} align="center">
                The user will lost access to the portal
              </Typography>
            </div>
            <div className={classes.buttonGroup}>
              <Button
                data-cy="closeButton"
                variant="outlined"
                className={classes.buttonOutline}
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                data-cy="closeButton"
                variant="contained"
                className={classes.buttonFilled}
                onClick={handleClose}
                disableElevation
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default DelUser;
