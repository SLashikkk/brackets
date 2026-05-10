module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const map = {};
  const openBrackets = [];
  for (let i = 0; i < bracketsConfig.length; i += 1) {
    const open = bracketsConfig[i][0];
    const close = bracketsConfig[i][1];

    openBrackets.push(open);
    map[close] = open;
  }
  for (let i = 0; i < str.length; i += 1) {
    const current = str[i];
    const isOpen = openBrackets.includes(current);
    const isClose = map[current] !== undefined;
    if (isOpen && isClose) {
      const top = stack[stack.length - 1];
      if (top === current) {
        stack.pop();
      } else {
        stack.push(current);
      }
    } else if (isOpen) {
      stack.push(current);
    } else if (isClose) {
      const lastOpen = stack.pop();
      if (lastOpen !== map[current]) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
