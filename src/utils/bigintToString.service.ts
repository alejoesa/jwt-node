export function transformBigInts(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj; // Valida si es un objeto o si es null

  if (Array.isArray(obj)) {
    return obj.map(transformBigInts); // devuelve un nuevo array
  }

  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === 'bigint') {
        newObj[key] = value.toString();
      } else if (typeof value === 'object') {
        newObj[key] = transformBigInts(value);
      } else {
        newObj[key] = value;
      }
    }
  }

  return newObj;
}
