const userId = localStorage.getItem('id')

async function userData(id) {
  const url = `http://localhost:3000/users/${id}`

  try {
    const data = await fetch(url).then((r) => r.json())

    const addressEl = document.getElementById('address-for-delivery')
    const openModal = document.querySelector('.address-div-switch')
    openModal.addEventListener('click', switchAddress)

    data.address.forEach((ad) => {

      if (ad.isDefault) {
        let labelIcon = ad.label
        labelIcon = labelIcon.charAt(0).toUpperCase() + labelIcon.slice(1);
        const icon = document.getElementById('icon')
        if (labelIcon === 'Casa') {
          icon.classList.add('fas', 'fa-house')
        } else if (labelIcon === 'Trabalho') {
          icon.classList.add('fas', 'fa-building')
        } else {
          icon.classList.add('fa-solid', 'fa-location-dot')
        }

        addressEl.textContent = ad.street
        const currentyLabel = document.querySelector('.label-address')
        currentyLabel.textContent = labelIcon + ':'

        const currentStreet = document.querySelector('.street')
        const components = ad.street.split(',')   
        const shortAddress = components.slice(0, 2).map(part => part.trim()).join(', ');
        currentStreet.textContent = shortAddress

        const houseNumber = document.querySelector('.number-house')
        houseNumber.textContent = `N° ${ad.house_Number}`

        const cityCompontents = ad.street.split(',')
        const shortCity = cityCompontents[cityCompontents.length -1]

        const city = document.querySelector('.city')
        city.textContent = shortCity
      }  
    });

    const avatar = document.getElementById('avatar')
    if (data.profilePicture !== "") {
      avatar.src = data.profilePicture
    }

    console.log(data);
  } catch (e) {
    console.error(`Erro ao executar função: ${e}`);
    
  }
}

userData(userId)

function switchAddress () {
  const modal = document.querySelector('.modal')
  
  modal.classList.toggle('display')

  const closeBtn = document.querySelector('.close-btn')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('display')
    })
  }
}