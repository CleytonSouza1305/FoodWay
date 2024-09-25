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

export function reformatPhone() {
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

export function validateNumber(idElement) {
  const input = document.getElementById(idElement)

  if (input.value.length === 15) {
    input.classList.remove('false');
    input.classList.add('true');
    return true;
  } else {
    input.classList.remove('true');
    input.classList.add('false');
    return false;
  }
}

export function validateAddress(idElement) {
  const addressInput = document.getElementById(idElement)
  addressInput.addEventListener('input', (el) => {
    const input = el.target
    if (input.value !== '' && input.value.length >= 3) {
      input.classList.remove('false')
      input.classList.add('true')
      return true
    } else {
      input.classList.remove('true')
      input.classList.add('false')
      return false
    }
  })
}

export function validateHouseNumber(idElement) {
  const houseNumber = document.getElementById(idElement)
  houseNumber.addEventListener('input', (el) => {
    const input = el.target
    let value = input.value.replace(/\D/g, '')

    if (input.value !== value) {
      input.value = value
    }
    
    if (value !== '') {
      input.classList.remove('false')
      input.classList.add('true')
      return true
    } else {
      input.classList.remove('true')
      input.classList.add('false')
      return false
    }
  })
}