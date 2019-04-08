/* 范围内随机数
 * min 最小值
 * max 最大值
*/
export function randomNum (min, max) {
  let choices = max - min + 1
  return Math.floor(Math.random() * choices + min)
}

/* 数组升序排序
 * arr 目标数组
*/
export function sortArray (arr) {
  arr.sort(compare)
  return arr
  function compare (value1, value2) {
    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else {
      return 0
    }
  }
}

/* 数组1指定位置插入数组2
 * arr1 数组1
 * arr2 数组2
 * index 插入位置
*/
export function insertArray (arr1, arr2, index) {
  arr2.unshift(index, 0)
  Array.prototype.splice.apply(arr1, arr2)
  return arr1
}

/* 日期格式化
 * data 日期 object
 * format 输出格式 string 如yyyy-MM-dd hh:mm
*/
export function formatDate (date, format) {
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      let str = o[k] + ''
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return format
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/* url参数格式化
*/
export function urlParse () {
  // ?id=12345&a=b
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // arr = ['?id=12345','a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  // obj = {id: "12345", a: "b"}
  return obj
}

/* localStorage存储
 * STORAGE_KEY 仓库名
 * id
 * key   属性名
 * value 属性值
 * saveToLocal ("__Score__", "小明", 50)
*/
export function saveToLocal (STORAGE_KEY, id, value) {
  let storage = window.localStorage.getItem(STORAGE_KEY)
  if (!storage) {
    storage = {}
    storage[id] = {}
  } else {
    storage = JSON.parse(storage)
    if (!storage[id]) {
      storage[id] = {}
    }
  }
  storage[id] = value
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage))
}
