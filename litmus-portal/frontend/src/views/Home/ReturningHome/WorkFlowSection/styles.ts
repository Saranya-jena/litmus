import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  workflowSchedule: {
    minWidth: '35%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3.8, 3.75, 0, 5.875),
    background: theme.palette.cards.header,
    marginTop: theme.spacing(6.375),
  },
  workflowHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2.5),
  },
  workflowText: {
    fontWeight: 500,
    fontSize: '1.5rem',
  },
}));

export default useStyles;
