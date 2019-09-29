export default (obj) => (
  Object.entries(obj || {})
    .map(([key, value]) => (
      typeof value === 'object' ?
        { ...value, key }
        :
        { key, value }
    ))
)