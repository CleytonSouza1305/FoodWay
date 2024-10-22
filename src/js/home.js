import { createNewAddress, deleteAddress, openUserModal, renderPaymentMethods, simplifyAddress } from "./funcoes.js"

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
    moreAddressDiv.id = 'addAddress'
    const spanMoreAddress = document.createElement('p')
    spanMoreAddress.innerHTML = `<i class="fas fa-plus"></i>`

    const deleteAddressDiv = document.createElement('div')
    deleteAddressDiv.classList.add('more-address')
    deleteAddressDiv.id = 'removeAddress'
    const spanDeleteAddress = document.createElement('p')
    spanDeleteAddress.innerHTML = `<i class="fas fa-trash"></i>`
    deleteAddressDiv.append(spanDeleteAddress)

    moreAddressDiv.append(spanMoreAddress)

    data.address.sort((a, b) => a.id - b.id);
    const reorganizedData = data.address.map((address, index) => ({
      ...address,
      id: index + 1
    }));

    const index = data.address.findIndex((I) => I.isDefault === true)
    if (index !== -1) {
      const [element] = data.address.splice(index, 1);
      data.address.unshift(element); 
     } else {
      reorganizedData[0].isDefault = true

      const response = await fetch('http://localhost:3000/users/' + userId, {
        method: 'PATCH',
        body: JSON.stringify({ address: reorganizedData }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log(true);
      }
     }

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
      labelAddress.textContent = labelToUpper + ':'

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
      pointsDiv.id = ad.id
      circleUm.id = ad.id
      circleDois.id = ad.id
      circleTres.id = ad.id
      pointsDiv.append(circleUm, circleDois, circleTres)
      editAddress.append(pointsDiv)

      addressBox.id = ad.id
      addressBox.append(divLabel, restInfoDiv, editAddress)
      modalContent.append(addressBox, moreAddressDiv, deleteAddressDiv)
    });

    const avatar = document.getElementById('avatar')
    if (data.profilePicture !== "") {
      avatar.src = data.profilePicture
    }

    addNewAddress()

  } catch (e) {
    console.error(`Erro ao executar função: ${e}`);
    console.error(`Linha: ${error.stack}`);

  }
}

await userData(userId)

function switchAddress () {
  const modal = document.querySelector('.modal')
  let isOpen = true
  const icon = document.getElementById('icon-chevron')

  if (isOpen) {
    icon.classList.remove('fas', 'fa-chevron-down')
    icon.classList.add('fa-solid', 'fa-chevron-up')
  }
  
  modal.classList.remove('display')

  modal.addEventListener('click', (el) => {
    if (el.target === modal) {
      modal.classList.add('display')
      icon.classList.remove('fa-solid', 'fa-chevron-up')
      icon.classList.add('fas', 'fa-chevron-down')
    }
  })

  const closeBtn = document.querySelector('.close-btn')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('display')
      icon.classList.remove('fa-solid', 'fa-chevron-up')
      icon.classList.add('fas', 'fa-chevron-down')
    })
  }
}

const pointsEdit = document.querySelectorAll('.pontinhos')
pointsEdit.forEach((btn) => {
  btn.addEventListener('click', (button) => {
    const id = parseFloat(button.target.id)
    editAddress(id)
  })
})

async function editAddress(idElement) {
  const content = document.querySelector('.modal-edit-address')
  content.classList.remove('display')

  const addressData = await fetch(`http://localhost:3000/users/${userId}`).then((r) => r.json())
  const addressArray = addressData.address

  let streetValue = document.getElementById('rua')
  let numberValue = document.getElementById('number')
  let labelValue = document.getElementById('label')
  addressArray.forEach((ad) => {
    if (ad.id === idElement) {
      streetValue.value = ad.street;
      numberValue.value = ad.house_Number;
      labelValue.value = ad.label;
      
      const form = document.getElementById('address-form')
      form.addEventListener('submit', async (ev) => {
        ev.preventDefault()
      
      const url = `http://localhost:3000/users/${userId}`
      let newAddress 

      const index = addressArray.findIndex((i) => i.id === idElement)
      if (index !== -1) {
        const street = streetValue.value
        const houseNumber = numberValue.value

        const addressApi = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${street}, ${houseNumber}`).then((r) => r.json())

        const shortAddress = simplifyAddress(addressApi[0].display_name)
        newAddress = {
          id: ad.id,
          label: labelValue.value,
          latitude: addressApi[0].lat,
          longitude: addressApi[0].lon,
          street: shortAddress,
          house_Number: numberValue.value,
          isDefault: ad.isDefault
        }
      } 

      addressArray[index] = newAddress
      addressData.address = addressArray
      
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(addressData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      const loader = document.querySelector('.content-loader');
      loader.classList.remove('display');
  
      if (response.ok) {
        loader.classList.add('display');
      }
    })
  }
})

  content.addEventListener('click', (el) => {
    if (el.target === content) {
      content.classList.add('display')
    }
  })

  const closeBtn = document.querySelector('.close-edit-btn-address')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      content.classList.add('display')
    })
  }
}
 
function addNewAddress() {
  const addNewAddressBtn = document.getElementById('addAddress')

  addNewAddressBtn.addEventListener('click', () => {
  const content = document.querySelector('.modal-edit-address')
  content.classList.remove('display')

  let streetValue = document.getElementById('rua')
  let numberValue = document.getElementById('number')
  let labelValue = document.getElementById('label')

  streetValue.value = ''
  numberValue.value = ''
  labelValue.value = ''
  
  const checkBoxLabel = document.querySelector('.checkbox-container')
  checkBoxLabel.classList.remove('display')

  const closeBtn = document.querySelector(`.close-edit-btn-address`)
  closeBtn.addEventListener(`click`, () => {
    content.classList.add('display')
    checkBoxLabel.classList.add('display')
  })

  const form = document.getElementById('address-form')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    if (streetValue.value !== `` && numberValue.value !== `` && labelValue.value !== ``) {
      const checkbox = document.getElementById('checkbox')
      let isChecked = false
      if (checkbox.checked) {
        isChecked = true
      }
      createNewAddress(streetValue.value, numberValue.value, labelValue.value, isChecked, userId)
    }
  })
})
}

const deleteAddressBtn = document.getElementById('removeAddress')
deleteAddressBtn.addEventListener('click', () => {
  deleteAddress(userId)
})

const profileButton = document.querySelector('.user-info-config')
profileButton.addEventListener('click', openUserModal)

renderPaymentMethods()