export const validateTodoTitle = (title) => {
  if (!title) {
    return { isValid: false, message: "Поле обязательно для заполнения" }
  }
  
  if (title.length < 2) {
    return { isValid: false, message: "Минимальная длина - 2 символа" }
  }
  
  if (title.length > 64) {
    return { isValid: false, message: "Максимальная длина - 64 символа" }
  }
  
  return { isValid: true }
}