
export const compareArrays = (array1: number[][], array2: number[][]): boolean => {
  for (let i = 0; i < array1.length; i++) {
    if (!arraysAreEqual(array1[i], array2[i])) {
      return false;
    }
  }
  return true;
};

const arraysAreEqual = (arr1: number[], arr2: number[]): boolean => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};
