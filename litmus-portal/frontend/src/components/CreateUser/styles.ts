import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    maxWidth: '63.75rem',
    marginTop: theme.spacing(3.75),
    marginLeft: theme.spacing(17.5),
    border: 1,
    borderColor: theme.palette.primary.dark,
    borderRadius: 3,
    paddingBottom: theme.spacing(5),
  },

  suSegments: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-even',
    marginLeft: theme.spacing(5),
  },
  headerText: {
    marginTop: theme.spacing(7.5),
    fontSize: '1.5625rem',
  },
  details: {
    maxWidth: '63.75rem',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginTop: theme.spacing(7.5),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  details1: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },

    alignContent: 'flex-start',
    flexWrap: 'wrap',
  },
  orange: {
    width: '4.81rem',
    height: '4.81rem',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1.625),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2.5),
    },
  },
  edit: {
    fontSize: '0.75rem',
    color: theme.palette.secondary.dark,
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.75),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2.5),
      marginBottom: theme.spacing(2),
    },
  },
  input: {
    display: 'none',
    alignItems: 'center',
  },
  dp: {
    display: 'flex',
    flexDirection: 'column',

    marginRight: theme.spacing(2.5),
  },
  pass: {
    width: '24.43rem',
    height: '4.8125rem',
    marginBottom: theme.spacing(2.5),
    padding: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: 3,
  },
  user: {
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: 3,
    width: '24.43rem',
    height: '4.8125rem',
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    paddingLeft: theme.spacing(3.75),
    marginBottom: theme.spacing(2.5),
  },
  divider: {
    marginTop: theme.spacing(3.75),
    maxWidth: '58.75rem',
  },

  txt1: {
    width: '24.43rem',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(3.75),
    fontSize: '1rem',
    color: theme.palette.text.disabled,
  },

  success: {
    border: '0.0625rem solid',
    borderColor: theme.palette.secondary.dark,
  },

  error: {
    border: '0.0625rem solid',
    borderColor: theme.palette.error.main,
  },

  createRandomButton: {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
    height: '2.75rem',
    '&:hover': {
      background: theme.palette.secondary.dark,
    },
  },

  resetPass: {
    color: theme.palette.primary.light,
  },
  copyDiv: {
    maxWidth: '8.56rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.palette.secondary.dark,
  },
  delDiv: {
    maxWidth: '8.56rem',
    display: 'flex',
    marginTop: theme.spacing(3),
    color: '#CA2C2C',
  },
  bin: {
    marginRight: theme.spacing(1.485),
  },
}));
export default useStyles;
