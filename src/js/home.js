const userId = localStorage.getItem('id')

async function userData(id) {
  const url = `http://localhost:3000/users/${id}`

  try {
    const data = await fetch(url).then((r) => r.json())

    const addressEl = document.getElementById('address-for-delivery')
    const openModal = document.querySelector('.address-div-switch')
    openModal.addEventListener('click', switchAddress)

    const modalContent = document.querySelector('.modal-content')
    const moreAddressDiv = document.createElement('div')
    moreAddressDiv.classList.add('more-address')
    const spanMoreAddress = document.createElement('p')
    spanMoreAddress.innerHTML = `<i class="fas fa-plus"></i>
`
    moreAddressDiv.append(spanMoreAddress)

    data.address.forEach((ad) => {
      const addressBox = document.createElement('div')
      addressBox.classList.add('box', 'address-box')

      if (ad.isDefault) {
        addressBox.classList.remove('address-box')
        addressBox.classList.add('actual-address')
        addressEl.textContent = ad.street
      }

      const divLabel = document.createElement('div')
      divLabel.classList.add('label-icon')
      const icon = document.createElement('i')
      icon.classList.add('icon')
      divLabel.append(icon)
      let labelIcon = ad.label
      labelIcon = labelIcon.charAt(0).toUpperCase() + labelIcon.slice(1);
      if (labelIcon === 'Casa') {
        icon.classList.add('fas', 'fa-house'); 
    } else if (labelIcon === 'Trabalho') {
        icon.classList.add('fas', 'fa-building'); 
    } else {
        icon.classList.add('fa-solid', 'fa-location-dot'); 
    }

      const restInfoDiv = document.createElement('div')
     restInfoDiv.classList.add('rest-infos')

      const labelAddress = document.createElement('span')
      labelAddress.classList.add('label-address')
      const labelToUpper = ad.label.charAt(0).toUpperCase() + ad.label.slice(1).toLowerCase();
      labelAddress.textContent = labelToUpper

      const street = document.createElement('span')
      street.classList.add('street')
      const components = ad.street.split(',')   
      const shortAddress = components.slice(0, 2).map(part => part.trim()).join(', ');
      street.textContent = shortAddress

      const houseNumber = document.createElement('span')
      houseNumber.classList.add('number-house')
      houseNumber.textContent = ad.house_Number

      const citySpan = document.createElement('span')
      citySpan.classList.add('city')
      const cityCompontents = ad.street.split(',')
      const shortCity = cityCompontents[cityCompontents.length -1]
      citySpan.textContent = shortCity

      restInfoDiv.append(labelAddress, street, houseNumber, citySpan)
      
      const editAddress = document.createElement('div')
      editAddress.classList.add('edit-address')
      editAddress.id = ad.id
      const circleUm = document.createElement('i')
      circleUm.classList.add('fas', 'fa-circle')
      const circleDois = document.createElement('i')
      circleDois.classList.add('fas', 'fa-circle')
      const circleTres = document.createElement('i')
      circleTres.classList.add('fas', 'fa-circle')
      const pointsDiv = document.createElement('div')
      pointsDiv.classList.add('pontinhos')
      pointsDiv.append(circleUm, circleDois, circleTres)
      editAddress.append(pointsDiv)

      addressBox.append(divLabel, restInfoDiv, editAddress)
      modalContent.append(addressBox, moreAddressDiv)
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

await userData(userId)

function switchAddress () {
  const modal = document.querySelector('.modal')
  
  modal.classList.remove('display')

  modal.addEventListener('click', (el) => {
    if (el.target === modal) {
      modal.classList.add('display')
    }
  })

  const closeBtn = document.querySelector('.close-btn')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('display')
    })
  }
}
 