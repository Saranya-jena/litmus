import { Tab, Tabs, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './styles';

const WorkFlowTabs: React.FC = () => {
  const classes = useStyles();
  // const { t } = useTranslation();
  const theme = useTheme();

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, actTab: number) => {
    setActiveTab(actTab);
  };

  // tabProps returns 'id' and 'aria-control' props of Tab
  function tabProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Tabs
      value={activeTab}
      onChange={handleChange}
      TabIndicatorProps={{
        style: {
          backgroundColor: theme.palette.primary.main,
        },
      }}
    >
      <Tab
        data-cy="membersTab"
        label={
          <span className={activeTab === 0 ? classes.active : classes.inActive}>
            Recent Workflows
          </span>
        }
        {...tabProps(0)}
      />
      <Tab
        data-cy="invitedTab"
        label={
          <span className={activeTab === 1 ? classes.active : classes.inActive}>
            Upcoming Workflows
          </span>
        }
        {...tabProps(1)}
        className={classes.rightTab}
      />
    </Tabs>
  );
};

export default WorkFlowTabs;
