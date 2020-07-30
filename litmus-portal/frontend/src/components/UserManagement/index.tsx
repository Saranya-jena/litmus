import { Typography } from '@material-ui/core';
import React from 'react';
import user from '../../assets/icons/user.svg';
import ButtonFilled from '../Button/ButtonFilled';
import CreateUser from '../CreateUser';
import useStyles from './styles';

const UserManagement: React.FC = () => {
  const classes = useStyles();
  const [showDiv, setShowDiv] = React.useState<boolean>(false);
  return (
    <div>
      {showDiv ? (
        <CreateUser />
      ) : (
        <div className={classes.UMDiv}>
          <Typography className={classes.headerText}>
            <strong>User Management</strong>
          </Typography>
          <div className={classes.members}>
            <img src={user} alt="members" />
            <Typography className={classes.memTypo}>
              Members (<span>10</span>)
            </Typography>
          </div>

          <ButtonFilled
            handleClick={() => {
              setShowDiv(true);
            }}
            data-cy="gotItButton"
            isPrimary
          >
            <div>Create new user</div>
          </ButtonFilled>
        </div>
      )}
    </div>
  );
};
export default UserManagement;
