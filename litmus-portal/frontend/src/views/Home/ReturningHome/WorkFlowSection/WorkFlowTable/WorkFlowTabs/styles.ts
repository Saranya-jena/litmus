import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  workflowSchedule: {
    minWidth: '35%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(3.8, 3.75, 2.5, 5.875),
    alignItems: 'center',
    background: theme.palette.cards.header,
    marginTop: theme.spacing(6.375),
  },
  workflowText: {
    fontWeight: 500,
    fontSize: '1.5rem',
  },
  active: {
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: '1rem',
  },
  inActive: {
    textTransform: 'capitalize',
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.text.hint,
  },
  rightTab: {
    marginLeft: theme.spacing(4.5),
  },
}));

export default useStyles;
