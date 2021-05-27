import { Button, Popover, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import cronstrue from 'cronstrue';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Workflow } from '../../../../../models/graphql/workflowListData';
import {
  getProjectID,
  getProjectRole,
} from '../../../../../utils/getSearchParams';
import useStyles, { StyledTableCell } from './styles';

interface TableDataProps {
  data: Workflow;
  // itemSelectionStatus: boolean;
  // labelIdentifier: string;
}

const TableData: React.FC<TableDataProps> = ({
  data,
  // itemSelectionStatus,
  // labelIdentifier,
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
  console.log('workflow:', data?.workflow_runs);
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
      {/* <StyledTableCell padding="checkbox" className={classes.checkbox}>
        <CheckBox
          checked={itemSelectionStatus}
          inputProps={{ 'aria-labelledby': labelIdentifier }}
        />
      </StyledTableCell> */}
      <StyledTableCell className={classes.workflowName}>
        <Typography>
          <strong>{data.workflow_name}</strong>
        </Typography>
      </StyledTableCell>

      <StyledTableCell>
        {data.cronSyntax === ''
          ? `${t('chaosWorkflows.browseSchedules.regularityOnce')}`
          : cronstrue.toString(data.cronSyntax)}
      </StyledTableCell>
      <StyledTableCell>
        <Typography className={classes.tableObjects}>
          {data.cluster_name}
        </Typography>
      </StyledTableCell>

      <StyledTableCell>
        <Typography className={classes.tableObjects}>
          {data?.workflow_runs ? data.workflow_runs.length : 0}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <div>
          <Button
            onClick={handlePopOverClick}
            className={classes.buttonTransform}
          >
            <div className={classes.expDiv}>
              <Typography /* className={classes.dark} */>
                {/* {t('chaosWorkflows.browseSchedules.showExperiments')} */}
                Experiment Results
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
              <div className={classes.popoverChild}></div>
            </div>
          </Popover>
        </div>
      </StyledTableCell>
    </>
  );
};
export default TableData;
