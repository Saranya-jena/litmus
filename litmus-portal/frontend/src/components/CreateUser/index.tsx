import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React from 'react';
import avatar from '../../assets/icons/avatar.png';
import copy from '../../assets/icons/copy.svg';
import DelUser from '../Modals/DelUser';
import ResetModal from '../Modals/ResetModal';
import useStyles from './styles';

interface State {
  password: string;
  err: boolean;
  showPassword: boolean;
}

const CreateUser = () => {
  const classes = useStyles();

  const regularExpression = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&_*])[a-zA-Z0-9!@#$%^&_*]{8,16}$/;

  const [showDiv, setShowDiv] = React.useState<boolean>(false);

  const [values2, setValues2] = React.useState<State>({
    password: '',
    showPassword: false,
    err: true,
  });
  const [values1] = React.useState<State>({
    password: '123456789',
    showPassword: false,
    err: false,
  });
  const [values3, setValues3] = React.useState<State>({
    password: '',
    showPassword: false,
    err: true,
  });

  const [formError2, setFormError2] = React.useState<boolean>(false);

  const handleChange2 = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      event.target.value.length >= 8 &&
      event.target.value !== values1.password &&
      regularExpression.test(event.target.value) &&
      (values3.password.length === 0 || event.target.value === values3.password)
    ) {
      setValues2({ ...values2, err: false, [prop]: event.target.value });
      setValues3({ ...values3, err: false });
      setFormError2(false);
    } else {
      setValues2({ ...values2, err: true, [prop]: event.target.value });
      setValues3({ ...values3, err: true });
      setFormError2(true);
    }
  };

  const handleClickShowPassword2 = () => {
    setValues2({ ...values2, showPassword: !values2.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.suSegments}>
          <Typography className={classes.headerText}>
            <strong> Personal Details</strong>
          </Typography>
          <div className={classes.details}>
            <div className={classes.dp}>
              <Avatar
                data-cy="avatar"
                alt="Richard Hill"
                src={avatar}
                className={classes.orange}
              >
                R
              </Avatar>
              <div>
                <label htmlFor="contained-button-file" id="editPic">
                  <input
                    name="contained-button-file"
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                  />
                  <Typography className={classes.edit}>Edit Photo</Typography>
                </label>
              </div>
            </div>
            <div className={classes.details1}>
              <TextField
                className={classes.user}
                id="filled-user-input"
                label="Full Name"
                InputProps={{ disableUnderline: true }}
                data-cy="fullName"
              />

              <TextField
                className={classes.user}
                id="filled-email-input"
                label="Email Address"
                name="email"
                InputProps={{
                  disableUnderline: true,
                }}
                data-cy="inputEmail"
              />

              <TextField
                className={classes.user}
                id="filled-username-input"
                label="Username"
                defaultValue="RichardHill"
                disabled
                InputProps={{
                  disableUnderline: true,
                }}
                data-cy="username"
              />
            </div>
          </div>
          <Divider className={classes.divider} />

          {showDiv ? (
            <div>
              <Typography
                className={classes.headerText}
                style={{ marginBottom: 40 }}
              >
                <strong> Reset Password</strong>
              </Typography>
              <ResetModal />
              <div className={classes.copyDiv}>
                <img src={copy} alt="copy" />
                <Typography>Copy the API key </Typography>
              </div>
              <DelUser />
            </div>
          ) : (
            <div>
              <Typography
                className={classes.headerText}
                style={{ marginBottom: 40 }}
              >
                <strong> Login Details</strong>
              </Typography>
              <div>
                <div className={classes.details1}>
                  <FormControl>
                    <Input
                      data-cy="changePassword"
                      className={`${classes.pass} ${
                        formError2 ? classes.error : classes.success
                      }`}
                      id="outlined-adornment-password"
                      type={values2.showPassword ? 'text' : 'password'}
                      onChange={handleChange2('password')}
                      disableUnderline
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            data-cy="conVisibilty"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values2.showPassword ? (
                              <Visibility data-cy="visIcon" />
                            ) : (
                              <VisibilityOff data-cy="invisIcon" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <InputLabel htmlFor="outlined-adornment-password">
                      New Password
                    </InputLabel>
                  </FormControl>

                  <TextField
                    className={classes.user}
                    id="filled-username-input"
                    label="Username"
                    defaultValue="RichardHill"
                    disabled
                    InputProps={{
                      disableUnderline: true,
                    }}
                    data-cy="username"
                  />
                </div>
                <Typography className={classes.txt1}>
                  New random password will be created for the user or create by
                  own
                </Typography>
              </div>

              <Button
                variant="contained"
                className={classes.createRandomButton}
                disableElevation
                onClick={() => {
                  setShowDiv(true);
                }}
              >
                Create new password
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateUser;
