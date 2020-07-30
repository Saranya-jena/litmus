import { Box, Button, Paper, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import AccountSettings from '../../components/AccountSettings';
import ButtonFilled from '../../components/Button/ButtonFilled';
import NewUserModal from '../../components/Modals/NewUserModal';
import UserManagement from '../../components/UserManagement';
import Scaffold from '../../containers/layouts/Scaffold';
import useStyles from './styles';

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Settings: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Scaffold>
      <div>
        <Paper className={classes.root} elevation={0}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Account" {...a11yProps(0)} />
            <Tab label="Team" {...a11yProps(1)} />
            <Tab label="USer Management" {...a11yProps(2)} />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <AccountSettings />
          <div className={classes.buttonGroup}>
            <Button
              data-cy="button"
              variant="outlined"
              className={classes.button}
              onClick={() => {}}
            >
              Cancel
            </Button>
            <ButtonFilled handleClick={() => {}} isPrimary>
              <>Save</>
            </ButtonFilled>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserManagement />
          <div className={classes.buttonGroup}>
            <Button
              data-cy="button"
              variant="outlined"
              className={classes.button}
              onClick={() => {}}
            >
              Cancel
            </Button>
            <NewUserModal />
          </div>
        </TabPanel>
      </div>
    </Scaffold>
  );
};

export default Settings;
