export const getTime = (time) => {
  var newDate = new Date()
  newDate.setTime(time * 1000)
  console.log(newDate.toLocaleDateString()) // 2022/2/22
  // console.log(newDate.toLocaleString()) // 2022/2/22 下午2:17:41
  // console.log(newDate.toLocaleTimeString()) // 下午2:17:41

  return newDate.toLocaleDateString()
}
