const array = [
  {
    id: '1',
    first: 'A',
    second: 'a',
    third: '1'
  },
  {
    id: '2',
    first: 'A',
    second: 'b',
    third: '1'
  },
  {
    id: '3',
    first: 'B',
    second: 'a',
    third: '2'
  },
  {
    id: '4',
    first: 'A',
    second: 'b',
    third: '3'
  }
]
const groups = ['first', 'second', 'third']
function toTree(array, groups) {
  const map = {}
  const [lastGroup] = groups.slice(-1)
  array.forEach(item => {
    let str = ''
    for (const g of groups) {
      const pid = str
      const value = item[g]
      str += value
      const id = str
      if (g === lastGroup) {
        Object.assign(item, { pid, value })
        map[item.id] = item
      } else {
        if (!map[id]) {
          const node = {
            id,
            pid,
            value
          }
          map[id] = node
          array.push(node)
        }
      }
    }
  })
  const tree = []
  array.forEach(item => {
    const { pid } = item
    if (pid) {
      ;(map[pid]['children'] || (map[pid]['children'] = [])).push(item)
    } else {
      tree.push(item)
    }
  })
  return tree
}
const tree = toTree(array, groups)
console.log(JSON.stringify(tree))
