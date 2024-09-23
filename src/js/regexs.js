export function validateName(idElement) {
  const input = document.getElementById(idElement)
  if (input.value.length > 2) {    
    input.classList.remove('false')
    input.classList.add('true')
    return true
  } else {
    input.classList.remove('true')
    input.classList.add('false')
    return false
  }
}

export function validateEmail(idElement) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const input = document.getElementById(idElement)
  if (regex.test(input.value)) {
    input.classList.add('true')
    input.classList.remove('false')
    return true
  } else {
    input.classList.remove('true')
    input.classList.add('false')
    return false
  }
}

export function validatePassword(idElement) {
  const regex = /[A-Za-z0-9]\d/
  const input = document.getElementById(idElement)
  if (regex.test(input.value)) {
    input.classList.add('true')
    input.classList.remove('false')
    return true
  } else {
    input.classList.remove('true')
    input.classList.add('false')
    return false
  }
}

export function validateConfirmPassword(idElement1, idElement2) {
  const inputPassword = document.getElementById(idElement1)
  const inputPasswordConfirm = document.getElementById(idElement2)
  const regex = /[A-Za-z0-9]\d/

  if (inputPasswordConfirm.value !== '' && regex.test(inputPasswordConfirm.value) && inputPassword.value === inputPasswordConfirm.value) {
    inputPasswordConfirm.classList.add('true')
    inputPasswordConfirm.classList.remove('false')
    return true
  } else {
    inputPasswordConfirm.classList.remove('true')
    inputPasswordConfirm.classList.add('false')
    return false
  }
}