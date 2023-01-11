function loadDataFront(){
  var data = JSON.parse(localStorage.getItem('gallery'))
  console.log(data)
  var result = data.map(function card(dt){
    return `<div class="col-md-3  ">
    <div class="card position-relative shadow-sm p-3 mb-5 bg-body rounded" >
      <img src="${dt.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title d-flex justify-content-sm-start">${dt.make} - ${dt.model}, ${dt.year}</h5>
        <p class="card-text d-flex justify-content-sm-start"><b>Colour</b>- ${dt.color} </p>
        <p class="card-text d-flex justify-content-sm-star"><b>Registration Number</b>- ${dt.regNum}</p>
      </div>
    </div>
  </div>`
  })
   document.getElementById('carlistFront').innerHTML = result.join("")
  }
  loadDataFront()

  // SEARCH BAR
var searchInput = document.getElementById("searchItem")
var cars = JSON.parse(localStorage.getItem('gallery'))
// console.log(cars)
searchInput.addEventListener("keyup", (e) => {
  var searchValue = e.target.value.toLowerCase()
  var filteredCharacters = cars.filter(character => {
    return (character.make.toLowerCase().includes(searchValue) || character.model.toLowerCase().includes(searchValue))
  })
  document.getElementById('carlistFront').innerHTML = filteredCharacters
  searchCar(filteredCharacters)
  // console.log(filteredCharacters)
})
// LOAD DATA ONCE FETCHED
var searchCar = (data) => {
  var characters = data.map((dt) => {
    return `<div class="col-md-3" id='carList'>
      <div class="card" class='car' style="width: 18rem;">
            <img src="${dt.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title d-flex justify-content-sm-start">${dt.make} - ${dt.model}, ${dt.year}</h5>
            <p class="card-text d-flex justify-content-sm-start"><b>Colour</b>- ${dt.color} </p>
            <p class="card-text d-flex justify-content-sm-star"><b>Registration Number</b>- ${dt.regNum}</p>
           </div>
       </div>
   </div>`
  }).join("");
  carlistFront.innerHTML = characters;
}