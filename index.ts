import fs from 'fs';
import { promisify } from 'util';

const access = promisify(fs.access);

async function exists(path: string) {
  try {
    await access(path, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function run(paths: string[]) {
  const promises = paths.map(path => exists(path));
  return Promise.all(promises);
}

export const every = async (src: string | string[]) => {
  const paths = src instanceof Array ? src : [src];
  const res = await run(paths);
  return res.every(b => b);
};

export const some = async (src: string | string[]) => {
  const paths = src instanceof Array ? src : [src];
  const res = await run(paths);
  return res.some(b => b);
};
