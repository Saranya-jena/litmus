import { useQuery } from '@apollo/client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { ButtonFilled } from 'litmus-ui';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../../../../../components/Loader';
import { WORKFLOW_LIST_DETAILS } from '../../../../../graphql';
import {
  Workflow,
  WorkflowList,
  WorkflowListDataVars,
} from '../../../../../models/graphql/workflowListData';
import { getProjectID } from '../../../../../utils/getSearchParams';
import {
  sortAlphaAsc,
  sortAlphaDesc,
  sortNumAsc,
  sortNumDesc,
} from '../../../../../utils/sort';
import WorkflowComparisonTable from '../WorkflowComparisonTable';
import useStyles from './styles';
import TableData from './TableData';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';

interface DateData {
  dateValue: string;
  fromDate: string;
  toDate: string;
}

interface SortData {
  lastRun: { sort: boolean; ascending: boolean };
  name: { sort: boolean; ascending: boolean };
  agents: { sort: boolean; ascending: boolean };
}

interface FilterOptions {
  selectedCluster: string;
  search: string;
  subject: string;
  agents: string;
  schedule: string;
}

interface PaginationData {
  pageNo: number;
  rowsPerPage: number;
}

const WorkflowTable: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const projectID = getProjectID();
  const [showComparisonTable, setShowComparisonTable] = useState<boolean>(
    false
  );
  const [selected, setSelected] = React.useState<Workflow[]>([]);
  const isSelected = (data: Workflow) => selected.indexOf(data) !== -1;
  console.log(selected);
  // States for filters
  const [filters, setFilters] = useState<FilterOptions>({
    selectedCluster: 'All',
    search: '',
    subject: 'All',
    agents: 'All',
    schedule: 'All',
  });

  // State for sorting
  const [sortData, setSortData] = useState<SortData>({
    lastRun: { sort: true, ascending: true },
    name: { sort: false, ascending: true },
    agents: { sort: true, ascending: true },
  });

  // State for pagination
  const [paginationData, setPaginationData] = useState<PaginationData>({
    pageNo: 0,
    rowsPerPage: 5,
  });

  // State for start date and end date
  const [dateRange, setDateRange] = React.useState<DateData>({
    dateValue: 'Select a period',
    fromDate: new Date(0).toString(),
    toDate: new Date(new Date().setHours(23, 59, 59)).toString(),
  });

  // Apollo query to get the scheduled workflow data
  const { data, loading, error } = useQuery<WorkflowList, WorkflowListDataVars>(
    WORKFLOW_LIST_DETAILS,
    {
      variables: { projectID, workflowIDs: [] },
      fetchPolicy: 'cache-and-network',
    }
  );

  const filteredData = data?.ListWorkflow.filter((dataRow) =>
    dataRow.workflow_name.toLowerCase().includes(filters.search.toLowerCase())
  )
    .filter((dataRow) =>
      filters.agents === 'All'
        ? true
        : dataRow.cluster_name
            .toLowerCase()
            .includes(filters.agents.toLowerCase())
    )
    .filter((dataRow) => {
      if (filters.schedule === 'All') return true;
      if (filters.schedule === 'Recurring') return dataRow.cronSyntax !== '';
      if (filters.schedule === 'Single Run') return dataRow.cronSyntax === '';
    })
    .filter((dataRow) => {
      return dateRange.fromDate && dateRange.toDate === undefined
        ? true
        : parseInt(dataRow.updated_at, 10) * 1000 >=
            new Date(moment(dateRange.fromDate).format()).getTime() &&
            parseInt(dataRow.updated_at, 10) * 1000 <=
              new Date(moment(dateRange.toDate).format()).getTime();
    })
    .sort((a: Workflow, b: Workflow) => {
      // Sorting based on unique fields
      if (sortData.name.sort) {
        const x = a.workflow_name;
        const y = b.workflow_name;

        return sortData.name.ascending
          ? sortAlphaAsc(x, y)
          : sortAlphaDesc(x, y);
      }

      if (sortData.lastRun.sort) {
        const x = parseInt(a.updated_at, 10);
        const y = parseInt(b.updated_at, 10);

        return sortData.lastRun.ascending
          ? sortNumAsc(y, x)
          : sortNumDesc(y, x);
      }

      return 0;
    });

  // Functions passed as props in the headerSection
  const changeSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFilters({ ...filters, search: event.target.value as string });
    setPaginationData({ ...paginationData, pageNo: 0 });
  };

  const changeSchedule = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setFilters({ ...filters, schedule: event.target.value as string });
    setPaginationData({ ...paginationData, pageNo: 0 });
  };

  const changeAgents = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setFilters({ ...filters, agents: event.target.value as string });
    setPaginationData({ ...paginationData, pageNo: 0 });
  };

  const changeSubject = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setFilters({ ...filters, subject: event.target.value as string });
    setPaginationData({ ...paginationData, pageNo: 0 });
  };

  // Function to set the date range for filtering
  const dateChange = (selectFromDate: string, selectToDate: string) => {
    setDateRange({
      dateValue: `${moment(selectFromDate)
        .format('DD.MM.YYYY')
        .toString()}-${moment(selectToDate).format('DD.MM.YYYY').toString()}`,
      fromDate: new Date(new Date(selectFromDate).setHours(0, 0, 0)).toString(),
      toDate: new Date(new Date(selectToDate).setHours(23, 59, 59)).toString(),
    });
  };

  const [popAnchorEl, setPopAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const isOpen = Boolean(popAnchorEl);

  const [open, setOpen] = React.useState<boolean>(false);

  const handlePopOverClose = () => {
    setPopAnchorEl(null);
    setOpen(false);
  };
  const handlePopOverClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClick = (data: Workflow) => {
    const selectedIndex = selected.indexOf(data);
    let newSelected: Workflow[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (data && event.target.checked) {
      const newSelects = data.ListWorkflow.map((n: Workflow) => n);
      setSelected(newSelects);
      return;
    }
    setSelected([]);
  };

  return (
    <div>
      {!showComparisonTable ? (
        <Paper className={classes.workflowSchedule} elevation={0}>
          <div className={classes.tableHeaderPaper}>
            <div className={classes.workflowHead}>
              <div>
                <Typography className={classes.workflowText}>
                  Workflow Comparison
                </Typography>
                <Typography>
                  Choose workflows to compare their resilience scores
                </Typography>
              </div>
              <div>
                <ButtonFilled
                  onClick={() => setShowComparisonTable(true)}
                  disabled={selected.length < 2}
                >
                  Compare Workflows
                </ButtonFilled>
              </div>
            </div>
            <TableToolbar
              searchValue={filters.search}
              changeSearch={changeSearch}
              agentsValue={filters.agents}
              changeAgent={changeAgents}
              scheduleValue={filters.schedule}
              changeSubject={changeSubject}
              subjectValue={filters.subject}
              changeSchedule={changeSchedule}
              popOverClick={handlePopOverClick}
              popOverClose={handlePopOverClose}
              isOpen={isOpen}
              data={data}
              popAnchorEl={popAnchorEl}
              isDateOpen={open}
              displayDate={dateRange.dateValue}
              selectDate={dateChange}
            />
          </div>
          <TableContainer className={classes.tableMain}>
            <Table aria-label="simple table">
              <TableHeader
                onSelectAllClick={handleSelectAllClick}
                numSelected={selected.length}
                rowCount={data ? data.ListWorkflow.length : 0}
                handleSortNameAsc={() =>
                  setSortData({
                    ...sortData,
                    name: { sort: true, ascending: true },
                    lastRun: { sort: false, ascending: true },
                    agents: { sort: false, ascending: true },
                  })
                }
                handleSortNameDesc={() =>
                  setSortData({
                    ...sortData,
                    name: { sort: true, ascending: false },
                    lastRun: { sort: false, ascending: true },
                    agents: { sort: false, ascending: true },
                  })
                }
                handleSortDateAsc={() =>
                  setSortData({
                    ...sortData,
                    name: { sort: false, ascending: true },
                    lastRun: { sort: true, ascending: true },
                    agents: { sort: false, ascending: true },
                  })
                }
                handleSortDateDesc={() =>
                  setSortData({
                    ...sortData,
                    name: { sort: false, ascending: true },
                    lastRun: { sort: true, ascending: false },
                    agents: { sort: false, ascending: true },
                  })
                }
                handleSortAgentAsc={() =>
                  setSortData({
                    ...sortData,
                    name: { sort: false, ascending: true },
                    lastRun: { sort: false, ascending: true },
                    agents: { sort: true, ascending: true },
                  })
                }
                handleSortAgentDesc={() =>
                  setSortData({
                    ...sortData,
                    name: { sort: false, ascending: true },
                    lastRun: { sort: false, ascending: true },
                    agents: { sort: true, ascending: false },
                  })
                }
              />
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Loader />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Typography data-cy="browseWorkflowError" align="center">
                        Unable to fetch data
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredData && filteredData.length ? (
                  filteredData
                    .slice(
                      paginationData.pageNo * paginationData.rowsPerPage,
                      paginationData.pageNo * paginationData.rowsPerPage +
                        paginationData.rowsPerPage
                    )
                    .map((data: Workflow, index: number) => {
                      const isItemSelected = isSelected(data);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          onClick={() => {
                            handleClick(data);
                          }}
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={data.workflow_id}
                          selected={isItemSelected}
                        >
                          <TableData
                            data={data}
                            itemSelectionStatus={isItemSelected}
                            labelIdentifier={labelId}
                          />
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Typography data-cy="browseWorkflowNoData" align="center">
                        No records available
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData?.length ?? 0}
            rowsPerPage={paginationData.rowsPerPage}
            page={paginationData.pageNo}
            onChangePage={(_, page) =>
              setPaginationData({ ...paginationData, pageNo: page })
            }
            onChangeRowsPerPage={(event) =>
              setPaginationData({
                ...paginationData,
                pageNo: 0,
                rowsPerPage: parseInt(event.target.value, 10),
              })
            }
          />
        </Paper>
      ) : (
        <WorkflowComparisonTable data={selected} />
      )}
    </div>
  );
};

export default WorkflowTable;
