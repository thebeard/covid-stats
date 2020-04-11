export function deepCopy<A = any>(original: A): A {
  return JSON.parse(JSON.stringify(original));
}

export function mergeOptions(copyTo: object, copyFrom: object): object {
  Object.entries(copyFrom).forEach(keyValue => {
    const [key, value] = keyValue;
    if (!copyTo[key]) {
      copyTo[key] = value;
    } else if (value instanceof Array) {
      value.forEach((arrayItem, index) => {
        if (!copyTo[key]) {
          copyTo[key] = [arrayItem];
        } else if (copyTo[key].length === 0 || index > copyTo[key].length - 1) {
          copyTo[key].push(arrayItem);
        } else {
          mergeOptions(copyTo[key][index], arrayItem);
        }
      });
    } else {
      mergeOptions(copyTo[key], value);
    }
  });
  return copyTo;
}
