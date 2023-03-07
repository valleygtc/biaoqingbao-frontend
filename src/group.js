export const isGroupAll = (group) => {
  return group.id === null;
}

export const getGroupAll = (groups) => {
  return groups[0];
}

export const getNormalGroups = (groups) => {
  return groups.slice(1);
}
