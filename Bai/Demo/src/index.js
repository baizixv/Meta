function myPow(x, n) {
  if (n === 0) {return 1}
  if (n < 0) {
    x = 1 / x
    n = -n
  }
  if (n % 2 === 0) {
    const half = myPow(x, n / 2)
    return half * half
  } else {
    const half = myPow(x, (n - 1) / 2)
    return x * half * half
  }
}
function myPow2(x, n) {
  if (n === 0) {return 1}
  if (n < 0) {
    x = 1 / x
    n = -n
  }
  let result = 1
  while (n > 0) {
    if (n % 2 === 1) {
      result *= x
    }
    x *= x
    n = Math.floor(n / 2)
  }
  return result
}
console.log(myPow(2, 4), myPow(2, 5))
