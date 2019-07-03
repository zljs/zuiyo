export const classify = (list, attr) => {
  /**
   * 刷选重组数组中相同属性对象
   */
  let c = []
  let d = {}
  list.forEach(element => {
    if (!d[element[attr]]) {
      c.push({
        [attr]: element[attr],
        groupList: [element]
      })
      d[element[attr]] = element
    } else {
      c.forEach(ele => {
        if (ele[attr] == element[attr]) {
          ele.groupList.push(element)
        }
      })
    }
  })

  return c
}
