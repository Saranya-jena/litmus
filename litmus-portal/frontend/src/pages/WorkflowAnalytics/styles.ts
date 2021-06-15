import { makeStyles } from '@material-ui/core/styles';

// Component styles
const useStyles = makeStyles((theme) => ({
  headingSection: {
    display: 'flex',
  },
  pageHeading: {
    flexGrow: 1,
  },
  heading: {
    fontSize: '2rem',
    marginBottom: theme.spacing(0.875),
  },
  subHeading: {
    fontSize: '1rem',
    marginBottom: theme.spacing(4.125),
  },
  infoStatsHeader: {
    padding: theme.spacing(3.5),
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '& p': {
      fontSize: '1.5rem',
      fontWeight: '500',
    },
  },
  infoStatsSection: {
    backgroundColor: theme.palette.cards.header,
    padding: theme.spacing(2.5, 3.25),
  },
  infoStats: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 3.875),
  },
}));

export default useStyles;
