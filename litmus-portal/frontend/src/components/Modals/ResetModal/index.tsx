import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import checkmark from '../../../assets/icons/checkmark.svg';
import copy from '../../../assets/icons/copy.svg';
import Lock from '../../../assets/icons/lock.svg';
import useStyles from './styles';

const ResetModal: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [showDiv, setShowDiv] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setShowDiv(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div>
      <div>
        <Typography className={classes.txt1} style={{ color: '#000000' }}>
          By resetting the password the user needs to re-login into the portal.
          <span
            role="button"
            onClick={handleClick}
            className={classes.resetPass}
            onKeyDown={handleClick}
            tabIndex={0}
          >
            Reset Password of the user
          </span>
        </Typography>

        <Modal
          data-cy="modal"
          open={open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          {showDiv ? (
            <div className={classes.paper}>
              <div className={classes.body}>
                <img src={checkmark} alt="checkmark" />
                <div className={classes.textSucess}>
                  <Typography className={classes.typo} align="center">
                    The user’s password was <strong>successfully reset </strong>
                  </Typography>
                </div>
                <div className={classes.text1Sucess}>
                  <Typography className={classes.typo1}>
                    The user needs to login with the new credentials. Copy the
                    credentials and share it with the respective user.
                  </Typography>
                </div>
                <div className={classes.copyDiv}>
                  <img src={copy} alt="copy" />
                  <Typography>Copy the credentials </Typography>
                </div>
                <Button
                  data-cy="closeButton"
                  variant="contained"
                  className={classes.buttonModalSucess}
                  onClick={handleClose}
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <div className={classes.paper}>
              <div className={classes.body}>
                <img src={Lock} alt="lock" />
                <div className={classes.text}>
                  <Typography className={classes.typo} align="center">
                    Are you sure to reset the
                    <strong> password of the current user?</strong>
                  </Typography>
                </div>
                <div className={classes.text1}>
                  <Typography className={classes.typo1}>
                    The user will need to relogin the portal with the new
                    credentials
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
                    onClick={() => {
                      setShowDiv(true);
                    }}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};
export default ResetModal;
