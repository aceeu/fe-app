export const cn = function () {
  let result = '';

  for (let i = 0; i < arguments.length; ++i) {
    let arg = arguments[i];
    if (!arg)
      continue;

    let nameType = typeof arg;

    if (nameType === 'string') {
      result += ' ' + arg;
    } else {
      for (let key in arg) {
        if (arg[key]) {
          result += ' ' + key;
        }
      }
    }
  }

  return result.substr(1);
};
