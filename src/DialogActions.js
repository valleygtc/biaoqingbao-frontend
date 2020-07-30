import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';

// flex-end -> space-around.
export default withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}))(MuiDialogActions);
