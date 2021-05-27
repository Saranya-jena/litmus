import {
  createStyles,
  makeStyles,
  TableCell,
  withStyles,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  workflowSchedule: {
    minWidth: '35%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(6.375),
  },
  tableHeaderPaper: {
    background: theme.palette.cards.header,
  },
  workflowHead: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(3.8, 3.75, 0, 5.875),
    alignItems: 'center',
    marginBottom: theme.spacing(2.5),
    flexWrap: 'wrap',
  },
  workflowText: {
    fontWeight: 500,
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2),
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '60%',
    flexWrap: 'wrap',
  },

  rangeSelectorIcon: {
    width: '0.625rem',
    height: '0.625rem',
  },
  tableMain: {
    height: '29.220rem',
    borderTop: `0.1px solid ${theme.palette.border.main}`,
    '&::-webkit-scrollbar': {
      width: '0.2em',
    },
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: `inset 0 0 6px ${theme.palette.common.black}`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '& td': {
      borderBottom: `1px solid ${theme.palette.border.main}`,
    },
  },
  // Form Select Properties
  formControl: {
    margin: theme.spacing(0.5),
    // marginRight: theme.spacing(2.5),
    height: '2.5rem',
    minWidth: '9rem',
  },

  selectText: {
    height: '2.5rem',
    padding: theme.spacing(0.5),
  },

  selectDate: {
    display: 'flex',
    marginLeft: theme.spacing(0.5),
    height: '2.6rem',
    minWidth: '9rem',
    border: '0.125rem solid',
    borderRadius: 4,
    borderColor: theme.palette.primary.main,
    textTransform: 'none',
  },
  displayDate: {
    marginLeft: theme.spacing(1),
    width: '100%',
  },

  workflowName: {
    borderRight: `1px solid ${theme.palette.border.main}`,
    paddingTop: theme.spacing(2.5),
    maxWidth: '16.5rem',
    color: theme.palette.text.primary,
  },

  workflowNameHead: {
    marginTop: theme.spacing(2),
  },
  tableHead: {
    opacity: 0.7,
    color: theme.palette.text.primary,
  },
  nameContent: {
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '0.8rem',
  },

  nameContentIcons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  checkbox: {
    paddingLeft: theme.spacing(3.75),
    paddingTop: theme.spacing(0.5),
  },
  markerIconDown: {
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(0.5),
    margin: 0,
  },

  markerIconUp: {
    color: theme.palette.text.primary,
    paddingTop: theme.spacing(0.5),
    margin: 0,
  },
  headSpacing: {
    paddingLeft: theme.spacing(6),
  },
  tableObjects: {
    paddingLeft: theme.spacing(3.75),
    color: theme.palette.text.primary,
  },
  lastCell: {
    borderLeft: `1px solid ${theme.palette.border.main}`,
    '& p': {
      color: theme.palette.text.primary,
    },
    '& button': {
      '&:hover': {
        background: 'none',
      },
    },
  },
  experimentDetails: {
    display: 'flex',
  },
  arrowMargin: {
    marginLeft: theme.spacing(0.5),
  },
  popover: {
    padding: theme.spacing(3.125, 2.6),
    width: '15.1875rem',
  },
  popoverChild: {
    marginBottom: theme.spacing(1),
  },
  buttonTransform: {
    textTransform: 'none',
    '&:hover': {
      background: 'none',
    },
  },
  weightDiv: {
    width: '18.1875rem',
    padding: theme.spacing(3.125, 2.6),
  },
  scheduleDetailsFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2),
  },
  scheduleDetailsValue: {
    width: '50%',
  },
  dark: {
    color: theme.palette.text.disabled,
  },
  expDiv: {
    display: 'flex',
    '& img': {
      marginRight: theme.spacing(1),
    },
  },
}));

export const StyledTableCell = withStyles((theme) =>
  createStyles({
    root: {
      borderBottom: `1px solid ${theme.palette.border.main}`,
    },
  })
)(TableCell);
export default useStyles;
