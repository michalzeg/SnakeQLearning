// fruit direction relative to snake head

//  0     1        2      3            4        5        6     7
// top top-right right bottom-right bottom bottom-left left top-left
export type RelativePosition = 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left' | 'top-left' | 'overlapping';
export type RelativePositionIndex = number;

const relativePostions: RelativePosition[] = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'];

export const getRelativePositionIndex = (value: RelativePosition) : RelativePositionIndex => relativePostions.indexOf(value) as RelativePositionIndex;
export const relativePositionCount = relativePostions.length;
