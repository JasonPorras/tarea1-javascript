import { fetchEventsByCategory } from "./api.js";

const cache = {};

const handler = {
  get: async (obj, prop) => {
    if (obj[prop]) {
      return Reflect.get(obj, prop);
    } else {
      try {
        obj[prop] = await fetchEventsByCategory(prop);
        return Reflect.get(obj, prop);
      } catch (error) {
        throw new Error("Error al obtener los eventos por categoría: " + error.message);
      }
    }
  },
};

const cacheProxy = new Proxy(cache, handler);

export { cacheProxy };
