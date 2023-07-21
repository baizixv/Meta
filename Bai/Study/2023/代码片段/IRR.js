// 计算IRR（内部收益率）是一个复杂的数值计算问题，
// 通常需要使用数值迭代方法来逼近IRR的值。
// 以下是一种常用的数值迭代方法, 二分法（二分逼近法）的JavaScript代码实现：

// ```javascript
function calculateIRR(cashFlows) {
  const epsilon = 0.00001 // 迭代的停止条件，当IRR的变化小于epsilon时停止迭代
  let lowerRate = -1.0 // IRR的下界
  let upperRate = 1.0 // IRR的上界
  let irr = 0.0 // 初始IRR的猜测值

  while (upperRate - lowerRate > epsilon) {
    const rate = (lowerRate + upperRate) / 2 // 二分逼近法计算IRR的新猜测值
    let npv = 0.0 // 净现值

    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + rate, i) // 根据IRR的猜测值计算净现值
    }

    if (npv > 0) {
      lowerRate = rate // 更新IRR的下界
    } else {
      upperRate = rate // 更新IRR的上界
    }

    irr = rate // 更新IRR的猜测值
  }

  return irr
}

// 示例用法
const cashFlows = [-100, 20, 30, 40, 50] // 现金流，第一个元素为初始投资，后续元素为每期的现金流入
const irr = calculateIRR(cashFlows)
console.log('IRR: ' + (irr * 100).toFixed(2) + '%')
// ```

// 在上述代码中，我们定义了一个`calculateIRR`函数，它接受一个数组`cashFlows`作为参数，表示投资的现金流。函数使用二分逼近法来计算IRR的值。我们通过不断调整IRR的猜测值，计算现金流的净现值，并根据净现值的正负来更新IRR的上界或下界，直到IRR的上界和下界之间的差小于给定的停止条件`epsilon`。

// 在示例用法中，我们提供了一个现金流数组`cashFlows`，其中第一个元素表示初始投资，后续元素表示每期的现金流入。我们调用`calculateIRR`函数来计算IRR的值，并将结果乘以100并保留两位小数后输出到控制台。

// 请注意，这只是IRR计算的一种方法，实际上有多种数值迭代方法可以用于计算IRR。此外，IRR的计算也可能存在多个根的情况，因此可能需要进行更复杂的处理。这里提供的代码只是一个简单的示例，你可以根据具体的需求进行调整和优化。

// 是的，除了二分法，还有其他一些常用的数值迭代方法可以用于计算IRR。以下是两种常见的方法：牛顿迭代法和割线法。
// 1. 牛顿迭代法（Newton's method）：
function calculateIRR(cashFlows) {
  const epsilon = 0.00001 // 迭代的停止条件，当IRR的变化小于epsilon时停止迭代
  let irr = 0.1 // 初始IRR的猜测值

  while (true) {
    let npv = 0.0 // 净现值
    let dnpv = 0.0 // 净现值的导数

    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + irr, i) // 根据IRR的猜测值计算净现值
      dnpv -= (i * cashFlows[i]) / Math.pow(1 + irr, i + 1) // 计算净现值的导数
    }

    const delta = npv / dnpv // 牛顿迭代法的更新公式

    if (Math.abs(delta) < epsilon) {
      break // 当IRR的变化小于epsilon时停止迭代
    }

    irr -= delta // 更新IRR的猜测值
  }

  return irr
}
// ```

// 2. 割线法（Secant method）：
// ```javascript
function calculateIRR(cashFlows) {
  const epsilon = 0.00001 // 迭代的停止条件，当IRR的变化小于epsilon时停止迭代
  let irr0 = 0.0 // IRR的初始猜测值
  let irr1 = 0.1 // IRR的初始猜测值

  while (true) {
    let npv0 = 0.0 // irr0对应的净现值
    let npv1 = 0.0 // irr1对应的净现值

    for (let i = 0; i < cashFlows.length; i++) {
      npv0 += cashFlows[i] / Math.pow(1 + irr0, i) // 根据irr0的猜测值计算npv0
      npv1 += cashFlows[i] / Math.pow(1 + irr1, i) // 根据irr1的猜测值计算npv1
    }

    const delta = (npv1 * (irr1 - irr0)) / (npv1 - npv0) // 割线法的更新公式

    if (Math.abs(delta) < epsilon) {
      break // 当IRR的变化小于epsilon时停止迭代
    }

    irr0 = irr1 // 更新irr0
    irr1 -= delta // 更新irr1
  }

  return irr1
}
