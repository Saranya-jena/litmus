import { IconButton, TableHead, TableRow } from '@material-ui/core';
import ExpandLessTwoToneIcon from '@material-ui/icons/ExpandLessTwoTone';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useStyles, { StyledTableCell } from './styles';

interface SortData {
  startDate: { sort: boolean; ascending: boolean };
  name: { sort: boolean; ascending: boolean };
  cluster: { sort: boolean; ascending: boolean };
}

interface TableHeaderProps {
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // numSelected: number;
  // rowCount: number;
  handleSortNameAsc: () => void;
  handleSortNameDesc: () => void;
  handleSortDateAsc: () => void;
  handleSortDateDesc: () => void;
  handleSortAgentAsc: () => void;
  handleSortAgentDesc: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  // onSelectAllClick,
  // numSelected,
  // rowCount,
  handleSortNameAsc,
  handleSortNameDesc,
  handleSortDateAsc,
  handleSortDateDesc,
  handleSortAgentAsc,
  handleSortAgentDesc,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow className={classes.tableHead}>
        {/* <StyledTableCell padding="checkbox" className={classes.checkbox}>
          <CheckBox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all workflows' }}
          />
        </StyledTableCell> */}
        <StyledTableCell className={classes.workflowName}>
          <div className={classes.nameContent}>
            <div className={classes.workflowNameHead}>
              <b>{t('analytics.tableHead1')} </b>&nbsp;
            </div>
            <div className={classes.nameContentIcons}>
              <IconButton
                aria-label="sort name ascending"
                size="small"
                onClick={handleSortNameAsc}
              >
                <ExpandLessTwoToneIcon className={classes.markerIconUp} />
              </IconButton>
              <IconButton
                aria-label="sort name descending"
                size="small"
                onClick={handleSortNameDesc}
              >
                <ExpandMoreTwoToneIcon className={classes.markerIconDown} />
              </IconButton>
            </div>
          </div>
        </StyledTableCell>

        <StyledTableCell className={classes.headSpacing}>
          <div className={classes.nameContent}>
            <b>{/* {t('analytics.tableHead3')} */}Regularity</b>&nbsp;
          </div>
        </StyledTableCell>
        <StyledTableCell className={classes.headSpacing}>
          <div className={classes.nameContent}>
            <div className={classes.workflowNameHead}>
              <b>{/* {t('analytics.tableHead2')} */} Agent</b>&nbsp;
            </div>

            <div className={classes.nameContentIcons}>
              <IconButton
                aria-label="sort cluster ascending"
                size="small"
                onClick={handleSortAgentAsc}
              >
                <ExpandLessTwoToneIcon className={classes.markerIconUp} />
              </IconButton>
              <IconButton
                aria-label="sort cluster descending"
                size="small"
                onClick={handleSortAgentDesc}
              >
                <ExpandMoreTwoToneIcon className={classes.markerIconDown} />
              </IconButton>
            </div>
          </div>
        </StyledTableCell>

        <StyledTableCell className={classes.headSpacing}>
          <div className={classes.nameContent}>
            <div className={classes.workflowNameHead}>
              <b>{/* {t('analytics.tableHead4') */}Number of Runs</b>&nbsp;
            </div>
          </div>
        </StyledTableCell>
        <StyledTableCell />
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
