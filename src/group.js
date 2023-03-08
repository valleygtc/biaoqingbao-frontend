export const isGroupAll = (group) => {
  return group.id === null;
}

export const getGroupAll = (groups) => {
  return groups[0];
}

export const getNormalGroups = (groups) => {
  return groups.slice(2);
}

export const isRecycleBin = (group) => {
  return group.id === -1;
}

export const isRecycleBinId = (group_id) => {
  return group_id === -1;
}

export const getRecycleBin = (groups) => {
  return groups[1];
}
