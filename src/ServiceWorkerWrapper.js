import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import * as serviceWorker from './serviceWorker';

export default function ServiceWorkerWrapper() {
  const [ msgOpen, setMsgOpen ] = useState(false);
  const [ waitingWorker, setWaitingWorker ] = useState(null);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMsgOpen(false);
  };

  const onSWUpdate = (registration) => {
    setMsgOpen(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setMsgOpen(false);
    window.location.reload(true);
  };

  return (
    <Snackbar
      open={msgOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      message="新版本已准备就绪！"
      onClick={reloadPage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={
        <Button color="secondary" size="small">
          刷新
        </Button>
      }
    />
  );
}
