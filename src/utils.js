export const getFilenameWithoutExt = (filename) => {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}
