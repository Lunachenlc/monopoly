// Elements
const $properties = document.getElementById('properties')
const $more = document.getElementById('more')
const $dialog = document.getElementById('dialog')

// Data
const deck = []

// Functions

/*
<div class="property">
      <div class="property-group" style="background-color: darkblue"></div>
      <h2 class="property-title">Boardwalk</h2>
      <p class="property-price">Price: $400</p>
    </div>
*/

function displayProperties (properties) {
  // $properties.innertHTML = properties.map(prop => `...`).join('')
  // for...of (const prop of $properties)
  // $properties.innerHTML = properties.reduce((html, prop) => html + `...`, '')
  deck.push(...properties)
  $properties.innerHTML = deck.reduce((html, prop) => html + `
  <div class="property" data-id="${prop.id}">
      <div class="property-group" style="background-color: ${prop.group}"></div>
      <h2 class="property-title">${prop.name}</h2>
      <p class="property-price">Price: $${prop.price}</p>
    </div>`, '')
}

//displayProperties()
function displayDeed(property) {
  $dialog.innerHTML = `
  <div class="deed">
  <div style="background-color: ${property.group}">
    <h2 class="deed-title" >${$property.name}</h2>
  </div>
  <div class="deed-rent">Rent $50.</div>
  <div class="deed-improved-rents">
    <p class="deed-improvement">With 1 House</p>
    <p class="deed-rent">200.</p>
    <p class="deed-improvement">With 2 Houses</p>
    <p class="deed-rent">600.</p>
    <p class="deed-improvement">With 3 Houses</p>
    <p class="deed-rent">1400.</p>
    <p class="deed-improvement">With 4 Houses</p>
    <p class="deed-rent">1700.</p>
    <p class="deed-improvement">With Hotel</p>
    <p class="deed-rent">2000.</p>
  </div>
</div>`
}

// Listeners
$properties.addEventListener('click', async function (e) {
  const $property = e.target.closest('.property')
  if ($property) {
    //console.log($property)
    const response = await fetch('https://monopoly.zoodinkers.com/api/properties/' + $property.dataset.id)
    $dialog.showModal()
  }
  
})

$dialog.addEventListener('click', function () {
  $dialog.close();
})

$more.addEventListener('click', async function (e) {
  const response = await fetch('https://monopoly.zoodinkers.com/api/properties?offset=' + deck.length)
  const json = await response.json()
  displayProperties(json)
})

fetch('https://monopoly.zoodinkers.com/api/properties')
  .then(response => response.json())
  .then(json => displayProperties(json))