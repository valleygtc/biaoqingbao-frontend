import { useState, useEffect } from 'react';


/**
 * 将 open 状态和 url 联系起来，以实现在手机端按下后退键关闭对话框。
 * 参考：
 *   - https://github.com/mui-org/material-ui/issues/12759#issuecomment-503894371
 *
 * 注：name 必须保证全应用（所有挂载的组件）唯一。
 */
export function useDialog(name) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setOpen(window.location.hash === `#${name}`);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleOpen = () => {
    window.location.hash = `#${name}`;
  }

  const handleClose = () => {
    window.history.back();
  }

  return { open, handleOpen, handleClose };
}
