// 将数据库中datetime类型的字段转化为 "YYYY-MM-DD HH:MM:SS"

function FormatDatabaseDatetime(dbDatetime) {
  const dateObject = new Date(dbDatetime)
  const year = dateObject.getFullYear()
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const day = dateObject.getDate().toString().padStart(2, '0')
  const hours = dateObject.getHours().toString().padStart(2, '0')
  const minutes = dateObject.getMinutes().toString().padStart(2, '0')
  const seconds = dateObject.getSeconds().toString().padStart(2, '0')
  const formattedDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  return formattedDatetime
}

export { FormatDatabaseDatetime }
