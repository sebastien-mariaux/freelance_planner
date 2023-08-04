// function to round number to 2 decimal places
export function round2(num: number): number {
  return Math.round(num * 100) / 100;
}

export const getDeepValue = (object: any, key: string) => {
  let keys  = key.split('.')
  while (keys.length > 0) {
    const currentKey = keys.shift()
    if (currentKey) {
      object = object[currentKey]
    }
  }
  return object
}