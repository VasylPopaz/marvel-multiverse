export const getRandomIds = (ids: number[], count: number): number[] => {
  const shuffled = [...ids].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
