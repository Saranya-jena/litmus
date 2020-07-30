import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  UMDiv: {
    marginTop: theme.spacing(3.75),
    marginLeft: theme.spacing(17.5),
  },
  headerText: {
    fontSize: '1.5625rem',
  },
  members: {
    display: 'flex',
    justifyContent: 'flex-start',
    color: theme.palette.secondary.dark,
  },
  memTypo: {
    fontSize: '1rem',
  },
}));
export default useStyles;
