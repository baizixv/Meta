/**
 * 数组相关的操作
 */
// 生成一个0-99的数组
// const arr = createArr(100) // 0 - 99 数组
export const createArr = n => Array.from(new Array(n), (_, i) => i)
export const createArr2 = n => new Array(n).fill(0).map((v, i) => i)

// 打乱这个数组的排序
// randomSort([0,1,2,3,4,5,6,7,8,9]) // 随机排列结果
export const randomSort = list => list.sort(() => Math.random() - 0.5)

// 数组去重
// removeDuplicates([0, 0, 2, 4, 5])
// [0,2,4,5]
export const removeDuplicates = list => [...new Set(list)]

// 多数组取交集
// intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9])
// [3, 4]
export const intersection = (a, ...arr) =>
  [...new Set(a)].filter(v => arr.every(b => b.includes(v)))

// 找到一个数组中的最大值的索引
// indexOfMax([1, 3, 9, 7, 5])
// 2
export const indexOfMax = arr => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0)

// 找到一个数组中的最小值的索引
// indexOfMin([2, 5, 3, 4, 1, 0, 9])
// 5
export const indexOfMin = arr => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0)

// 在一个数组中找到一个最接近的值
// closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50)
// 33
export const closest = (arr, n) =>
  arr.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev))

// 将多个数组压缩成一个数组
//  zip([1,2,3,4], ['a', 'b', 'c', 'd'], ['A', 'B', 'C', 'D'])
//  [[1, 'a', 'A'], [2, 'b', 'B'], [3, 'c', 'C'], [4, 'd', 'D']]
export const zip = (...arr) =>
  Array.from({ length: Math.max(...arr.map(a => a.length)) }, (_, i) => arr.map(a => a[i]))

// 将一个矩阵的行和列进行互相交换
// transpose([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ])
// [
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 6, 9],
//  ]
export const transpose = matrix => matrix[0].map((col, i) => matrix.map(row => row[i]))

/** 数组平均数 */
export const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length
// average([1, 2, 3]) -> 2