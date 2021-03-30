const fi = (function () {
  return {
    libraryMethod: function () {
      return "Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0";
    },

    each: function (collection, callback) {
      const newCollection =
        collection instanceof Array
          ? collection.slice()
          : Object.values(collection);

      for (let item of newCollection) callback(item);

      return collection;
    },

    map: function (collection, callback) {
      const newCollection =
        collection instanceof Array
          ? collection.slice()
          : Object.values(collection);
      let out = [];
      for (let item of newCollection) out.push(callback(item));

      return out;
    },

    reduce: function (collection, callback, acc) {
      let newCollection =
        collection instanceof Array
          ? collection.slice()
          : Object.values(collection);
      if (!acc) {
        acc = collection[0];
        newCollection = newCollection.slice(1);
      }
      for (let i = 0; i < newCollection.length; i++) {
        acc = callback(acc, newCollection[i], newCollection);
      }

      return acc;
    },

    find: function (collection, predicate) {
      let newCollection =
        collection instanceof Array
          ? collection.slice()
          : Object.values(collection);
      for (let item of newCollection) if (predicate(item)) return item;

      return undefined;
    },

    filter: function (collection, predicate) {
      let newCollection =
        collection instanceof Array
          ? collection.slice()
          : Object.values(collection);
      let out = [];
      for (let item of newCollection) if (predicate(item)) out.push(item);

      return out;
    },

    size: function (collection) {
      let newCollection =
        collection instanceof Array
          ? collection.slice()
          : Object.keys(collection);
      let i = 0;
      while (newCollection[i] !== undefined) i++;
      return i;
    },

    first: function (array, bound) {
      if (bound) {
        let out = array.slice(0, bound);
        return out;
      }

      return array[0];
    },

    last: function (array, bound) {
      if (bound) {
        bound *= -1;
        let out = array.slice(bound);
        return out;
      }

      return array.slice(-1)[0];
    },

    compact: function (array) {
      const nixMe = new Set([false, null, 0, "", undefined, NaN]);
      return array.filter((item) => !nixMe.has(item));
    },

    sortBy: function (array, callback) {
      let newArr = [...array];
      return newArr.sort((a, b) => callback(a) - callback(b));
    },

    unpack: function (receiver, arr) {
      for (let val of arr) receiver.push(val);
    },

    flatten: function (collection, shallow, newArr = []) {
      if (!Array.isArray(collection)) return newArr.push(collection);
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val);
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr);
        }
      }
      return newArr;
    },

    uniqSorted: function (array, iter) {
      const sorted = [array[0]];
      for (let i = 0; i < array.length; i++) {
        if (sorted[i - 1] !== array[i]) sorted.push(array[i]);
      }
      return sorted;
    },

    uniq: function (array, sorted = false, iter = false) {
      if (sorted) {
        return fi.uniqSorted(array, iter);
      } else if (!iter) {
        return Array.from(new Set(array));
      } else {
        const modVals = new Set();
        const uniqVals = new Set();
        for (let val of array) {
          const modVal = iter(val);
          if (!modVals.has(modVal)) {
            modVals.add(modVal);
            uniqVals.add(val);
          }
        }
        return Array.from(uniqVals);
      }
    },

    keys: function (obj) {
      const keys = [];
      for (let key in obj) {
        keys.push(key);
      }
      return keys;
    },

    values: function (obj) {
      const values = [];
      for (let key in obj) {
        values.push(obj[key]);
      }
      return values;
    },

    functions: function (obj) {
      const funcNames = [];
      for (let key in obj) {
        if (typeof obj[key] === "function") {
          funcNames.push(key);
        }
      }
      return funcNames;
    },
  };
})();

fi.libraryMethod();
