// ---------- import Local Tools
import { getCtData } from './getCtData';
import { pathSel } from './pathSel';
import { useData } from '../../..';

// ----------- set Variable Selection

export const getVarValue = ( path, setGet ) => {
  const checkString = typeof path !== 'string';
  if (checkString) return [false, null];

  const condBool = path.includes('{{') && path.includes('}}');
  if (!condBool) return [false, null];

  const varPath = path.replace('{{', '').replace('}}', '');
  if (setGet === 'noComponent') {
    const varValue = getCtData(varPath);
    console.log('dentro getCtData', { varValue });
    return [true, varValue];
  }

  const varValue = useData(ct => pathSel(ct, varPath));
  return [true, varValue];
};
