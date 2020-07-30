import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

    borderBottom: '1px solid #e8e8e8',
    flexGrow: 1,
    maxWidth: '63.75rem',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginLeft: theme.spacing(17.5),
  },
  buttonGroup: {
    display: 'flex',
    marginLeft: theme.spacing(17.625),
    marginTop: theme.spacing(3.75),
    flexGrow: 1,
    maxWidth: '63.75rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {},
  },
  button: {
    textTransform: 'none',
    width: '6.68rem',
    height: '2.75rem',
    borderRadius: 3,
    fontSize: '0.75rem',
    borderColor: theme.palette.secondary.dark,
  },
}));
export default useStyles;
