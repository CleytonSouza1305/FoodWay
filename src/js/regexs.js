export function validateVisualName() {
  const input = document.getElementById('name')

  input.addEventListener('input', (el) => {
    const element = el.target
    const value = element.value
    if (value.length > 2) {    
      element.classList.remove('false')
      element.classList.add('true')
    } else {
      element.classList.remove('true')
      element.classList.add('false')
    }
  })
}

export function validateName() {
  const input = document.getElementById('name')

  if (input.value.length > 2) {
    return true
  } else {
    return false
  }
}

//.............................................................................................

export function validateVisualEmail() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const input = document.getElementById('email')

  input.addEventListener('input', (el) => {
    const element = el.target
    const value = element.value

    if (regex.test(value)) {
      element.classList.add('true')
      element.classList.remove('false')
    } else {
      element.classList.remove('true')
      element.classList.add('false')
    }
  })
}

export function validatelEmail() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const input = document.getElementById('email')
  if (regex.test(input.value)) {
    return true
  } else {
    return false
  }
}

//.............................................................................................

export function validateVisualPassword() {
  const regex = /[A-Za-z0-9]\d/
  const input = document.getElementById('password')

  input.addEventListener('input', (el) => {
    const element = el.target
    const value = element.value

    if (regex.test(value) && value.length >= 8) {
      element.classList.add('true')
      element.classList.remove('false')
    } else {
      element.classList.remove('true')
      element.classList.add('false')
    }
  })
}

export function validatePassword() {
  const regex = /[A-Za-z0-9]\d/
  const input = document.getElementById('password')
  if (regex.test(input.value)) {
    return true
  } else {
    return false
  }
}

//.............................................................................................

export function validateVisualConfirmPassword() {
  const inputPassword = document.getElementById('password')
  const inputPasswordConfirm = document.getElementById('confirm-password')

  inputPasswordConfirm.addEventListener('input', (el) => {
    const element = el.target
    const value = element.value

    if (value === inputPassword.value) {
      element.classList.add('true')
      element.classList.remove('false')
    } else {
      element.classList.remove('true')
      element.classList.add('false')
   }
  })
}

export function validateConfirmPassword() {
  const inputPasswordConfirm = document.getElementById('confirm-password')
  const regex = /[A-Za-z0-9]\d/

    if (regex.test(inputPasswordConfirm.value)) {
      return true
    } else {
      return false
   }
}

//.............................................................................................

export function validateVisualPhone() {
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', (el) => {
    let input = el.target.value.replace(/\D/g, ''); 
    let finalPhone = '';
  
    if (input.length > 0) {
      finalPhone += '(' + input.substring(0, 2); 
    }
    if (input.length > 2) {
      finalPhone += ') ' + input.substring(2, 7); 
    }
    if (input.length >= 7) {
      finalPhone += '-' + input.substring(7, 11); 
    }

    phoneInput.value = finalPhone.substring(0, 15);

    if (phoneInput.value.length === 15) {
      phoneInput.classList.remove('false')
      phoneInput.classList.add('true')
    } else {
      phoneInput.classList.remove('true')
      phoneInput.classList.add('false')
    }
  });
}

export function validatePhone() {
  const input = document.getElementById('phone')

  if (input.value.length === 15) {
    return true
  } else {
    return false
  }
}

//.............................................................................................


export function validateVisualAddress() {
  const addressInput = document.getElementById('address')
  addressInput.addEventListener('input', (el) => {
    const element = el.target
    const value = element.value
    if (value !== '' && value.length >= 3) {
      element.classList.remove('false')
      element.classList.add('true')
    } else {
      element.classList.remove('true')
      element.classList.add('false')
    }
  })
}

export function validateAddress() {
  const addressInput = document.getElementById('address')
 
    if (addressInput.value !== '' && addressInput.value.length >= 3) {
      return true
    } else {
      return false
    }
}
 
//.............................................................................................

export function validateVisualHouseNumber() {
  const houseNumber = document.getElementById('address-number')
  houseNumber.addEventListener('input', (el) => {
    const input = el.target
    let value = input.value.replace(/\D/g, '')

    if (input.value !== value) {
      input.value = value
    }
    
    if (value !== '') {
      input.classList.remove('false')
      input.classList.add('true')
    } else {
      input.classList.remove('true')
      input.classList.add('false')
    }
  })
}

export function validateHouseNumber() {
  const input = document.getElementById('address-number')
    let value = input.value.replace(/\D/g, '')

    if (input.value !== value) {
      input.value = value
    }
    
    if (value !== '') {
      return true
    } else {
      return false
    }
}