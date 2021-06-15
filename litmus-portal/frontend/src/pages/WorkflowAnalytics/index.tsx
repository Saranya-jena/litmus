import { Typography } from '@material-ui/core';
import { ButtonFilled } from 'litmus-ui';
import React from 'react';
import BackButton from '../../components/Button/BackButton';
import Scaffold from '../../containers/layouts/Scaffold';
import useStyles from './styles';

const AnalyticsPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Scaffold>
      <BackButton />
      {/* Heading of the Page */}
      <div className={classes.headingSection}>
        <div className={classes.pageHeading}>
          <Typography className={classes.heading}>
            Workflow - Basic K8S Conformance
          </Typography>
          <Typography className={classes.subHeading}>
            Here’s the analytic of selected workflow
          </Typography>
        </div>
        <div>
          <ButtonFilled onClick={() => {}}>PDF</ButtonFilled>
        </div>
      </div>
      {/* Information and stats */}
      <div className={classes.infoStatsHeader}>
        <Typography>Information and statistics</Typography>
      </div>
      <div className={classes.infoStatsSection}>
        <div className={classes.infoStats}>
          <Typography>Workflow details :</Typography>
        </div>
      </div>
    </Scaffold>
  );
};

export default AnalyticsPage;
