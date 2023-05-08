/**
 * 数学相关的操作
 */

/** 字符串的排列数 */
// anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
export const anagrams = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str]
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
      []
    )
}
