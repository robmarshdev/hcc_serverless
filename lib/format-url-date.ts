export const formatUrlDate = (date: Date): string => {
  return date.toLocaleDateString()
    .split('/')
    .join('-');
};
