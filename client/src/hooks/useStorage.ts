export const useStorage = () => {
  function set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  function get<T = any>(key: string): T | undefined {
    const item = localStorage.getItem(key)
    if(!item) return
    return JSON.parse(item)
  }

  function remove(key: string): void {
    localStorage.removeItem(key)
  }

  return {
    set,
    get,
    remove
  }
}