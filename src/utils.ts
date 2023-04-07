import readPackageJson from 'read-package-json';

/**
 * Recursively merges two or more objects into the first object.
 * @template T - The type of the first object to merge.
 * @param {T} obj - The first object to merge.
 * @param {...object} sources - The objects to merge into the first object.
 * @returns {T} The merged object.
 * @author ChatGPT
 */
export function merge<T extends object>(obj: T, ...sources: object[]): T {
  sources.forEach((source) => {
    for (const key in source) {
      if (typeof source[key] === 'object') {
        if (!obj[key]) Object.assign(obj, { [key]: {} });
        merge(obj[key], source[key]);
      } else {
        Object.assign(obj, { [key]: source[key] });
      }
    }
  });
  return obj;
}

const noop = () => {};

/**
 * @see https://github.com/npm/read-package-json
 */
export async function readPkgJson(
  path: string,
  logFn: (...str: string[]) => void = noop,
  strict: boolean = false,
): Promise<any> {
  return new Promise((resolve, reject) => {
    readPackageJson(path, logFn, strict, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
