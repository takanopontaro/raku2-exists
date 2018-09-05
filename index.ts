import fs from 'fs';
import ndPath from 'path';
import { promisify } from 'util';

import { Options } from './index.d';

const access = promisify(fs.access);

async function exists(path: string) {
  try {
    await access(path, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function run(paths: string[], options?: Options) {
  const cwd = (options && options.cwd) || null;
  const promises = paths.map(path => {
    const p = cwd ? ndPath.resolve(cwd, path) : path;
    return exists(p);
  });
  return Promise.all(promises);
}

const every = async (src: string | string[], options?: Options) => {
  const paths = src instanceof Array ? src : [src];
  const res = await run(paths, options);
  return res.every(b => b);
};

const some = async (src: string | string[], options?: Options) => {
  const paths = src instanceof Array ? src : [src];
  const res = await run(paths, options);
  return res.some(b => b);
};

module.exports = { every, some };
