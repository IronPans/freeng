export function createRound(methodName) {
  const func = Math[methodName];
  return (number, precision) => {
    precision = precision == null ? 0 : Math.min(precision, 292);
    if (precision) {
      let pair = `${number}e`.split('e');
      const value = func(`${pair[0]}e${+pair[1] + precision}`);

      pair = `${value}e`.split('e');
      return +`${pair[0]}e${+pair[1] - precision}`;
    }
    return func(number);
  }
}
