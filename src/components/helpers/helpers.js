export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};


export const chooseRandom = (arr, num = 1) => {
  if (!arr?.length) {
    return []
  }
  const res = [];
  for (let i = 0; i < num; ) {
    const random = Math.floor(Math.random() * arr.length);
    if (res.indexOf(arr[random]) !== -1) {
      continue;
    }
    res.push(arr[random]);
    i++;
  }
  return res;
};