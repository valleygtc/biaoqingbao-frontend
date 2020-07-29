export const getFilenameWithoutExt = (filename) => {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

export const delay = (ms) => new Promise(
  resolve => setTimeout(() => resolve(true), ms)
);
