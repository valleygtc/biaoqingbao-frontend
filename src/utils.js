export const getFilenameWithoutExt = (filename) => {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

export const delay = (ms) => new Promise(
  resolve => setTimeout(() => resolve(true), ms)
);

export const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// from: https://stackoverflow.com/a/46181/7499223
export const isLegalEmail = (email) => {
  return emailPattern.test(String(email).toLowerCase());
}
