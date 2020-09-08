import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import AccountSettings from '../../components/Sections/Settings/AccountsTab/AccountSettings';
import TeammingTab from '../../components/Sections/Settings/TeammingTab';
import UserManagement from '../../components/Sections/Settings/UserManagementTab/UserManagement';
import Scaffold from '../../containers/layouts/Scaffold';
import { RootState } from '../../redux/reducers';
import useStyles from './styles';

interface TabPanelProps {
  children: React.ReactNode;
  index: any;
  value: any;
}

// TabPanel ise used to implement the functioning of tabs
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

// tabProps returns 'id' and 'aria-control' props of Tab
function tabProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{}>, actTab: number) => {
    setActiveTab(actTab);
  };

  const { userData } = useSelector((state: RootState) => state);
  return (
    <Scaffold>
      <div>
        <Typography className={classes.Head}>Settings </Typography>
        <Paper className={classes.root} elevation={0}>
          <Tabs
            className={classes.tab}
            value={activeTab}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="My Account" {...tabProps(0)} disabled />
            <Tab label="Team" {...tabProps(1)} />
            {userData.username === 'admin' ? (
              <Tab label="User Management" {...tabProps(2)} />
            ) : (
              <></>
            )}
          </Tabs>
        </Paper>
        <TabPanel value={activeTab} index={0}>
          <AccountSettings />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <TeammingTab />
        </TabPanel>
        {userData.username === 'admin' ? (
          <TabPanel value={activeTab} index={2}>
            <UserManagement />
          </TabPanel>
        ) : (
          <></>
        )}
      </div>
    </Scaffold>
  );
};

export default Settings;
