import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "./regexs.js";

async function callApiUsers() {
  return await fetch(`http://localhost:3000/users`).then((r) => r.json())
}

async function validateForm() {
  const users = await callApiUsers()

  const name = validateName('name')
  const email = validateEmail('email')
  const password = validatePassword('password')
  const confirmPassword = validateConfirmPassword('password' ,'confirm-password')

  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')

  if (name && email && password && confirmPassword) {
    const infoValidateDiv = document.querySelector('.infos-validate')
    infoValidateDiv.classList.remove('display')

    const loader = document.querySelector('.loader');
    loader.classList.remove('display')

    let userFounded = false
    users.forEach((u) => {
      if (u.name === nameInput.value && u.email === emailInput.value && u.password === passwordInput.value) {
        userFounded = true
      }
    })

    loader.classList.add('display')

    if (userFounded) {
      location.href = '../pages/home.html'
    } else {
      // chamar a função de criar uma conta
    }

  } else {
    const infoValidateDiv = document.querySelector('.infos-validate')
    infoValidateDiv.classList.remove('display')
    const textContentInfos = document.querySelector('.info-p')
    textContentInfos.classList.add('color-erro')

    setTimeout(() => {
      textContentInfos.classList.remove('color-erro')
    }, 1000 * 1)
  }
}

const form = document.querySelector('form')
form.addEventListener('submit', (ev) => {
  ev.preventDefault()

  validateForm()
})

addEventListener('keypress', (event) => {
  const key = event.key

  if (key === 'Enter') {
    validateForm()
  }
})