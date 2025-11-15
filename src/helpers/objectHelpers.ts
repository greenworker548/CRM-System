export const getChangedFields = <T>(
  newData: T,
  oldData: T,
  fields: (keyof T)[]
): Partial<T> => {
  const changedFields: Partial<T> = {}

  fields.forEach((field) => {
    if (newData[field] !== oldData[field]) {
      changedFields[field] = newData[field]
    }
  })

  return changedFields
}
