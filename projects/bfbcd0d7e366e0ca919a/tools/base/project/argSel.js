
// ---------- import Local Tools
import { pathSel } from './pathSel';

// ----------- set Arguments Selection

export const argSel = (args, inputStr) => {
  const path = inputStr.replace('#', '');
  const value = pathSel(args, path);
  return value;
};
  