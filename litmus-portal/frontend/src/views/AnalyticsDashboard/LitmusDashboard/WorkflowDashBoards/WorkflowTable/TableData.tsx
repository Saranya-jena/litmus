import { Button, IconButton, Popover, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import cronstrue from 'cronstrue';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import YAML from 'yaml';
import { CheckBox } from '../../../../../components/CheckBox';
import { Workflow } from '../../../../../models/graphql/workflowListData';
import { history } from '../../../../../redux/configureStore';
import {
  getProjectID,
  getProjectRole,
} from '../../../../../utils/getSearchParams';
import ExperimentPoints from '../../../../ChaosWorkflows/BrowseSchedule/ExperimentPoints';
import useStyles, { StyledTableCell } from './styles';

interface TableDataProps {
  data: Workflow;
  itemSelectionStatus: boolean;
  labelIdentifier: string;
}

const TableData: React.FC<TableDataProps> = ({
  data,
  itemSelectionStatus,
  labelIdentifier,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const projectID = getProjectID();
  const userRole = getProjectRole();

  // Function to convert UNIX time in format of DD MMM YYY
  const formatDate = (date: string) => {
    const updated = new Date(parseInt(date, 10) * 1000).toString();
    const resDate = moment(updated).format('DD MMM YYYY');
    return resDate;
  };

  const [
    popAnchorElSchedule,
    setPopAnchorElSchedule,
  ] = React.useState<null | HTMLElement>(null);
  const isOpenSchedule = Boolean(popAnchorElSchedule);
  const idSchedule = isOpenSchedule ? 'simple-popover' : undefined;
  const handlePopOverCloseForSchedule = () => {
    setPopAnchorElSchedule(null);
  };

  const handlePopOverClickForSchedule = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setPopAnchorElSchedule(event.currentTarget);
  };

  const [popAnchorEl, setPopAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const isOpen = Boolean(popAnchorEl);
  const id = isOpen ? 'simple-popover' : undefined;
  const handlePopOverClose = () => {
    setPopAnchorEl(null);
  };
  const handlePopOverClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopAnchorEl(event.currentTarget);
  };
  return (
    <>
      <StyledTableCell padding="checkbox" className={classes.checkbox}>
        <CheckBox
          checked={itemSelectionStatus}
          inputProps={{ 'aria-labelledby': labelIdentifier }}
        />
      </StyledTableCell>
      <StyledTableCell className={classes.workflowName}>
        <Typography>
          <strong>{data.workflow_name}</strong>
        </Typography>
      </StyledTableCell>

      <StyledTableCell>
        <Typography className={classes.tableObjects}>
          {data.cluster_name}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <div>
          <Button
            onClick={handlePopOverClick}
            className={classes.buttonTransform}
          >
            <div className={classes.expDiv}>
              <Typography
                className={
                  YAML.parse(data.workflow_manifest).spec.suspend &&
                  classes.dark
                }
              >
                {t('chaosWorkflows.browseSchedules.showExperiments')}
              </Typography>
              {isOpen ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
            </div>
          </Button>
          <Popover
            id={id}
            open={isOpen}
            anchorEl={popAnchorEl}
            onClose={handlePopOverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className={classes.popover}>
              {data.weightages.map((weightEntry) => (
                <div
                  key={weightEntry.experiment_name}
                  className={classes.popoverChild}
                >
                  <ExperimentPoints
                    expName={weightEntry.experiment_name}
                    weight={weightEntry.weightage}
                  />
                </div>
              ))}
            </div>
          </Popover>
        </div>
      </StyledTableCell>
      <StyledTableCell>
        <div>
          <Button
            onClick={handlePopOverClickForSchedule}
            className={classes.buttonTransform}
          >
            <div className={classes.expDiv}>
              <img src="./icons/timerIcon.svg" alt="schedule icon" />
              <Typography
                className={
                  YAML.parse(data.workflow_manifest).spec.suspend &&
                  classes.dark
                }
              >
                {t('chaosWorkflows.browseSchedules.showSchedule')}
              </Typography>
              {isOpenSchedule ? (
                <KeyboardArrowDownIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </div>
          </Button>
          <Popover
            id={idSchedule}
            open={isOpenSchedule}
            anchorEl={popAnchorElSchedule}
            onClose={handlePopOverCloseForSchedule}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className={classes.weightDiv}>
              <Typography className={classes.scheduleDetailsFlex}>
                {t('chaosWorkflows.browseSchedules.startingDate')} :
                <span className={classes.scheduleDetailsValue}>
                  {formatDate(data.created_at)}
                </span>
              </Typography>
              <Typography className={classes.scheduleDetailsFlex}>
                {t('chaosWorkflows.browseSchedules.lastRun')} :
                <span className={classes.scheduleDetailsValue}>
                  {formatDate(data.updated_at)}
                </span>
              </Typography>
              <Typography className={classes.scheduleDetailsFlex}>
                {t('chaosWorkflows.browseSchedules.regularity')} :
                <span className={classes.scheduleDetailsValue}>
                  {data.cronSyntax === ''
                    ? `${t('chaosWorkflows.browseSchedules.regularityOnce')}`
                    : cronstrue.toString(data.cronSyntax)}
                </span>
              </Typography>
            </div>
          </Popover>
        </div>
      </StyledTableCell>
      <StyledTableCell>
        <Typography className={classes.tableObjects}>
          {formatDate(data.updated_at)}
        </Typography>
      </StyledTableCell>

      <StyledTableCell className={classes.lastCell}>
        <IconButton
          edge="end"
          aria-label="analytics for workflow id"
          aria-haspopup="true"
          onClick={() => {
            history.push({
              pathname: `/workflows/analytics/${data.workflow_id}`,
              search: `?projectID=${projectID}&projectRole=${userRole}`,
            });
          }}
        >
          <div>
            <img src="./icons/analyticsIcon.svg" alt="analytics" />
            <Typography>
              {t(
                'chaosWorkflows.browseAnalytics.workFlowComparisonTable.seeAnalytics'
              )}
            </Typography>
          </div>
        </IconButton>
      </StyledTableCell>
    </>
  );
};
export default TableData;
