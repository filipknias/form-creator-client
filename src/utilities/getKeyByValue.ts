export const getKeyByValue = <T>(object: Record<string, T>, value: T): string|null => {
    for (const key in object) {
      if (object[key] === value) {
        return key;
      }
    }
    return null;
}