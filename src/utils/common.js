// 判断两个变量值是否相等
function isEqual(obj1, obj2) {
  // 一、 先处理特殊情况

  // 1. 基本类型参与比较的话直接返回 === 的结果
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  // 2. 地址相等的两个对象直接返回true
  if (obj1 === obj2) {
    return true
  }

  // 二、 接下来是一般的情况：两个对象比较值

  // 改动：先比较两个对象的类型
  if (!isSameType(obj1, obj2)) {
    return false
  }

  // 1. 先比较二者keys的个数
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }
  // 2. 以obj1为基准，和obj2一次递归比较
  for (const key in obj1) {
    if (!obj2Keys.includes(key)) {
      return false
    }
    const res = isEqual(obj1[key], obj2[key])
    if (!res) {
      return false
    }
  }

  // 全相等
  return true
}

function isObject(obj) {
  return typeof obj === 'object' && obj != null // typeof null === object
}

function isSameType(a, b) {
  return Object.prototype.toString.call(a) === Object.prototype.toString.call(b)
}

// 对象深拷贝
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const clone = Array.isArray(obj) ? [] : {}
  const keys = Object.keys(obj)
  for (const key of keys) {
    // 递归深拷贝每个属性的值
    clone[key] = deepClone(obj[key])
  }
  return clone
}

export { isEqual, deepClone }
