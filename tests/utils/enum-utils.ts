/**
 * Return a random value from a string-based enum.
 * Usage: getRandomEnumValue(MyEnum)
 */
export function getRandomEnumValue<T>(anEnum: Record<string, T>): T {
  const values = Object.values(anEnum) as T[];
  if (values.length === 0) {
    throw new Error('Enum has no values');
  }
  const index = Math.floor(Math.random() * values.length);
  return values[index];
}

export default getRandomEnumValue;
