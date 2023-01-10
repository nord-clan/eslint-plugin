export function getByValue<T, K>(map: Map<T, K>, searchValue: K) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}
