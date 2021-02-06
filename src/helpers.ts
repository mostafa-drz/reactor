function getAllIndices(input: string[], search: string) {
  let indices = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === search) indices.push(i);
  }
  return indices.join(",");
}

export { getAllIndices };
