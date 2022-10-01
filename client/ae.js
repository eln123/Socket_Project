const array = [2, 5, -3, -4, 6, 7, 2];

function nextGreaterElement(array) {
  const result = new Array(array.length).fill(-1);
  const stack = [];

  for (let idx = 0; idx < 2 * array.length; idx++) {
    const circularIdx = idx % array.length;

    while (
      stack.length > 0 &&
      array[stack[stack.length - 1]] < array[circularIdx]
    ) {
      // stack[stack.length - 1] is an indexOf value, not a value from array at an index
      const top = stack.pop();
      console.log("top", top);
      result[top] = array[circularIdx];
    }
    // here you are putting indexes in stack, not value
    console.log("circularIdx", circularIdx);
    stack.push(circularIdx);
  }
  return result;
}

let answer = nextGreaterElement(array);
console.log(answer);
