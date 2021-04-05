import { Paper } from '@material-ui/core';
import { ButtonFilled } from 'litmus-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
import WorkFlowTabs from './WorkFlowTable/WorkFlowTabs/workflowtabs';
import WorkFlowToolbar from './WorkflowToolbar/workflowtoolbar';

const WorkflowSection: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Paper className={classes.workflowSchedule} elevation={0}>
        <div className={classes.workflowHead}>
          <div className={classes.workflowText}>Workflow Schedules</div>
          <div>
            <ButtonFilled onClick={() => {}}>
              {t('workflows.scheduleAWorkflow')}
            </ButtonFilled>
          </div>
        </div>
        <div>
          <WorkFlowTabs />
          <WorkFlowToolbar />
        </div>
      </Paper>
    </>
  );
};

export default WorkflowSection;
