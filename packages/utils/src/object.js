/**
 * 对象相关的操作
 */

// 删除一个对象中的属性值为null或undefined的所有属性
// removeNullUndefined({name: '', age: undefined, sex: null})
// { name: '' }
export const removeNullUndefined = obj =>
  Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})

// 将对象的键值对交换
// invert({name: 'jack'})
// {jack: 'name'}
export const invert = obj =>
  Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {})

// 深度比较两个对象，js的等于只能判断对象的地址是否相同，当地址不相同的时候无法判断两个对象的键值对是否一致
// isEqual({ name: 'jack' }, { name: 'jack' }) // true
// isEqual({ name: 'jack' }, { name: 'jack1' }, { name: 'jack' }) // false

export const isEqualObject = (...objects) =>
  objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))
