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

class DialogHeap extends Array {
  constructor(hash) {
    if (hash === '') {
      super();
    } else {
      super(...hash.substring(1).split(','));
    }
  }

  toHash() {
    if (this.length === 0) {
      return '';
    } else {
      return '#' + this.join(',');
    }
  }
}

/**
 * 将 open 状态和 url 联系起来，以实现在手机端按下后退键关闭对话框。
 * 允许多个对话框同时打开。
 *
 * 注：
 *   1. name 必须保证全应用（所有挂载的组件）唯一。
 *   2. name 中不得含有英文逗号。
 */
export function useHeapedDialog(name) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const openHeap = new DialogHeap(window.location.hash);
      setOpen(openHeap.includes(name));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleOpen = () => {
    const openHeap = new DialogHeap(window.location.hash);
    openHeap.push(name);
    window.location.hash = openHeap.toHash();
  }

  const handleClose = () => {
    window.history.back();
  }

  return { open, handleOpen, handleClose };
}
