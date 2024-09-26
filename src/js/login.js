import { 
  validateVisualName 

  } from "./regexs.js";

async function validateForm() {
  const dataUser = await fetch(`http://localhost:3000/users`).then((r) => r.json())

  try { 
    const form = document.querySelector('form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()

      const buton = document.getElementById('submit-btn')
      if (buton.type === 'submit') {

      } else {
        
      }
    })
    
    console.log(dataUser);
  } catch (e) {
    console.error(`Erro ao executar programa. ${e}`);
  }
}

validateForm()

