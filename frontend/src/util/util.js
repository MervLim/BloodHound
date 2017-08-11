export const formatDate = date => {
  const m = date.getMonth() + 1
  const d = date.getDate()
  const month = m + 1 < 10 ? '0${m}' : '${m}'
  const day = d < 10 ? '0${d}' : '${d}'
  return '${date.getFullYear()}-${month}-${day}'
}
