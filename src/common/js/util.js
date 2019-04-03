/* 范围内随机数
 * min 最小值
 * max 最大值
 * ceil 是否取整
*/
export function randomNum (min, max, ceil) {
  let num = Math.random() * (max - 1) + min
  if (ceil) {
    return Math.ceil(num)
  }
  return num
}
