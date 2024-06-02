export const wait = (value: number): Promise<void> => {
  if (value === 0) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, value);
  });
};
