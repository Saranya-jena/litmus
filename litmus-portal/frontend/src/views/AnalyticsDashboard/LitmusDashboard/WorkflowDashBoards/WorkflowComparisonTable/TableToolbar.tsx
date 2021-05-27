import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Typography,
  useTheme,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Search } from 'litmus-ui';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { useTranslation } from 'react-i18next';
import { Workflow } from '../../../../../models/graphql/workflowListData';
import useStyles from './styles';

interface TableToolBarProps {
  searchValue: string;
  agentsValue: string;
  subjectValue: string;
  isOpen: boolean;
  data: Workflow[];
  isDateOpen: boolean;
  popAnchorEl: HTMLElement | null;
  displayDate: string;
  changeSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  changeSubject: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  changeAgent: (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => void;
  popOverClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  popOverClose: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  selectDate: (selectFromDate: string, selectToDate: string) => void;
}

interface RangeType {
  startDate: string;
  endDate: string;
}

const TableToolBar: React.FC<TableToolBarProps> = ({
  searchValue,
  agentsValue,
  subjectValue,
  isOpen,
  data,
  popAnchorEl,
  displayDate,
  changeSearch,
  changeSubject,
  changeAgent,
  popOverClick,
  popOverClose,
  selectDate,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { palette } = useTheme();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const getClusters = (searchingData: Workflow[]) => {
    const uniqueList: string[] = [];
    searchingData.forEach((data) => {
      if (!uniqueList.includes(data.cluster_name)) {
        uniqueList.push(data.cluster_name);
      }
    });
    return uniqueList;
  };
  return (
    <div className={classes.workflowHead}>
      <Search
        id="input-with-icon-textfield"
        placeholder={t('settings.teamingTab.label.search')}
        value={searchValue}
        onChange={changeSearch}
      />
      <div className={classes.filters}>
        {/* Select Cluster */}
        <FormControl variant="outlined" className={classes.formControl} focused>
          <InputLabel className={classes.selectText}>Target Agent</InputLabel>
          <Select
            value={agentsValue}
            onChange={changeAgent}
            label="Target Cluster"
            className={classes.selectText}
          >
            <MenuItem key="All" value="All">
              All
            </MenuItem>
            {(data ? getClusters(data) : []).map((cluster: string) => (
              <MenuItem key={cluster} value={cluster}>
                {cluster}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Select Subject */}
        <FormControl variant="outlined" className={classes.formControl} focused>
          <InputLabel className={classes.selectText}>Target Cluster</InputLabel>
          <Select
            value={subjectValue}
            onChange={changeSubject}
            label="Target Cluster"
            className={classes.selectText}
          >
            <MenuItem value="All">All</MenuItem>
            {(data ? getClusters(data) : []).map((cluster: string) => (
              <MenuItem key={cluster} value={cluster}>
                {cluster}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button className={classes.selectDate} onClick={popOverClick}>
          <Typography className={classes.displayDate}>
            {displayDate}
            <IconButton style={{ width: 10, height: 10 }}>
              {isOpen ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Typography>
        </Button>
        <Popover
          open={isOpen}
          anchorEl={popAnchorEl}
          onClose={popOverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          style={{
            marginTop: 10,
          }}
        >
          <DateRangePicker
            onChange={(item) => {
              setState([(item as any).selection]);
              selectDate(
                `${(item as any).selection.startDate}`,
                `${(item as any).selection.endDate}`
              );
            }}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={state}
            direction="vertical"
            editableDateInputs
            rangeColors={[palette.primary.dark]}
            showMonthAndYearPickers
          />
        </Popover>
      </div>
    </div>
  );
};

export default TableToolBar;
