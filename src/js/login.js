import { 
  validateAddress,
  validateConfirmPassword,
  validateHouseNumber,
  validatelEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateVisualAddress,
  validateVisualConfirmPassword,
  validateVisualEmail,
  validateVisualHouseNumber,
  validateVisualName, 
  validateVisualPassword,
  validateVisualPhone

  } from "./regexs.js";

async function validateForm() {
  const dataUser = await fetch(`http://localhost:3000/users`).then((r) => r.json())
  validateVisualName()
  validateVisualEmail()
  validateVisualPassword()
  validateVisualConfirmPassword()
  validateVisualPhone()
  validateVisualAddress()
  validateVisualHouseNumber()

  
  try { 
    const form = document.querySelector('form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
      const btn = document.getElementById('submit-btn')

      if (btn.textContent === 'Entrar') {
        const name = validateName()
        const email = validatelEmail()
        const password = validatePassword()
        const confirmPassword = validateConfirmPassword()
        if (name && email && password && confirmPassword) {
        const nameInput= document.getElementById('name').value
        const emailInput= document.getElementById('email').value
        const passwordInput = document.getElementById('password').value
        
        let userFounded = false
        dataUser.forEach((u) => {
          if (u.name === nameInput && u.email === emailInput && u.password === passwordInput) {
            localStorage.setItem('id', u.id)
            userFounded = true
          }
        })

        console.log(userFounded);
        
        if (userFounded) {
          const loader = document.querySelector('.content-loader');
          loader.classList.remove('display')

          setTimeout(() => {
            loader.classList.add('display')
            location.href = 'src/pages/home.html'
          }, 3 * 1000)
        } else {
          const loader = document.querySelector('.content-loader');
          loader.classList.remove('display')

          setTimeout(() => {
            loader.classList.add('display')
          }, 3 * 1000)
          
          setTimeout(() => {
            const infoDiv = document.querySelector('.infos-validate')
            infoDiv.classList.remove('display')

            const txt = document.querySelector('.info-p')
            txt.innerHTML = `O usuário <strong>"${nameInput}"</strong> não foi econtrado, <br> por favor <span class="have-account">Criar conta<span>`
            txt.classList.add('color-erro')

            setTimeout(() => {
              txt.classList.remove('color-erro')
            }, 3 * 1000);
          }, 3 * 1000);
        }
      } else {
        const loader = document.querySelector('.content-loader');
          loader.classList.remove('display')

          setTimeout(() => {
            loader.classList.add('display')
          }, 3 * 1000)
          
          setTimeout(() => {
            const infoDiv = document.querySelector('.infos-validate')
            infoDiv.classList.remove('display')

            const txt = document.querySelector('.info-p')
            txt.classList.add('color-erro')

            setTimeout(() => {
              txt.classList.remove('color-erro')
            }, 3 * 1000);
          }, 3 * 1000);
      }
      }
    
    })

    const createAccountBtn = document.querySelectorAll('.have-account')
      createAccountBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          const confirmPassDiv = document.querySelector('.c-pass')
          confirmPassDiv.classList.add('display')

          const phoneDiv = document.querySelector('.phoneDiv')
          phoneDiv.classList.remove('display')

          const addressDiv = document.querySelector('.addressDiv')
          addressDiv.classList.remove('display')

          const houseNumberDiv = document.querySelector('.houseNumberDiv')
          houseNumberDiv.classList.remove('display')

          const submitBtn = document.getElementById('submit-btn')
          submitBtn.textContent = 'Criar conta'

          submitBtn.addEventListener('click', () => {
          const name = validateName()
          const email = validatelEmail()
          const password = validatePassword()
          const phone = validatePhone()
          const address = validateAddress()
          const houseNumber = validateHouseNumber()

            if (name && email && password && phone && address && houseNumber) {
              alert('true')
            } else {
              alert('false')
            }
          })
        })
      })
    
    console.log(dataUser);
  } catch (e) {
    console.error(`Erro ao executar programa. ${e}`);
  }
}

validateForm()

