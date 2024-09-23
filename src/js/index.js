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

  const infoValidateDiv = document.querySelector('.infos-validate')

  const loader = document.querySelector('.content-loader');

loader.classList.remove('display');

setTimeout(() => {
  loader.classList.add('display');

  if (name && email && password && confirmPassword) {
    let userFounded = false;

    users.forEach((u) => {
      if (u.name === nameInput.value && u.email === emailInput.value && u.password === passwordInput.value) {
        console.log(u);
        userFounded = true;
      }
    });

    if (userFounded) {
      location.href = '../src/pages/home.html'; 
    } else {
      createAccount()
    }
  } else {
    infoValidateDiv.classList.remove('display')
    const text = document.querySelector('.info-p')
    text.classList.add('color-erro')

    setTimeout(() => {
      text.classList.remove('color-erro')
    }, 2 * 1000);
  }
}, 1000 * 2)
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

async function createAccount() {
  const infoValidateDiv = document.querySelector('.infos-validate')
  infoValidateDiv.classList.add('display')

  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const passwordnput = document.getElementById('password')
  const phonenput = document.getElementById('phone')
  const addressInput = document.getElementById('address')
  const numberInput = document.getElementById('address-number')

  const users = await callApiUsers()
  const lastUser = users[users.lenght - 1]
  parseFloat(lastUser)

  const newUser = {
    id: lastUser + 1,
    name: nameInput.value,
    email: emailInput.value,
    password: passwordnput.value,
    phone: phonenput.value,
    profilePicture: "",
    address: [{ street: addressInput, houseNumber: numberInput }],
    paymentMethods: [],
    favorites: [],
    orderHistory: []
  }

  console.log(newUser);
}
