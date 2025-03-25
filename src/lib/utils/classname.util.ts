export const getGridCols = (cardPerPage: number): string => {
  if (cardPerPage === 1) return 'grid-cols-1';
  else if (cardPerPage === 2) return 'grid-cols-2';
  else if (cardPerPage === 3) return 'grid-cols-3';
  else return 'grid-cols-4';
};
