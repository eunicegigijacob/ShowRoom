// localstorage - hold car data in json
// creat an empty json object
var cars = [] // array to used in memory
var car ={
    model :null,
    make : null,
    year: null,
    color: null,
    regNum: null,
    image : null,
}

function dataStore(){
if(localStorage.getItem('gallery') == null){
     localStorage.setItem('gallery',JSON.stringify(cars)) // used disk   
}else{
  cars = JSON.parse(localStorage.getItem('gallery'))
  console.log(cars)
}
  // cars = JSON.parse(localStorage.getItem('gallery'))
  //  console.log(cars)
 //  cars = JSON.parse(localStorage.getItem('gallery'))
 
 
//  var newCars = cars.concat(JSON.parse(localStorage.getItem('gallery')))
//   localStorage.setItem('gallery',newCars)


}



// function will be called once on page load
dataStore()

function addToCarList(){
  var yr = document.getElementById("year")
  var mk = document.getElementById("make")
  var img = document.getElementById("image")
  var md = document.getElementById("model")
  var rg = document.getElementById("regNum")
  var cl = document.getElementById("color")

 var ncar = Object.create(car)
  if (mk.value.trim()!= 0 && img.value.trim()!= 0 && md.value.trim()!= 0 && rg.value.trim()!= 0 && yr.value.trim()!= 0 && cl.value.trim()!= 0) {
       ncar.make = mk.value
       ncar.image = img.value
       ncar.model = md.value
       ncar.regNum = rg.value
       ncar.year = yr.value
       ncar.color = cl.value


       cars.push(ncar)
       console.log(cars)
       localStorage.setItem('gallery', JSON.stringify(cars))
       clear(mk, img, md, rg, yr, cl)
       cfm()
       console.log("loading data from storage")
       loadData()
  }
  else alert('car listing cannot be empty')


}


function clear(mk,md,cl,img,yr,rn) {
    mk.value = ""
    md.value = ""
    cl.value = ""
    img.value = ""
    yr.value = ""
    rn.value = ""
}

function cfm(){
Swal.fire(
    'Good job!',
    'Data saved Successfully',
    'success'
  )    
}

function photoUpload(){
    var pht = document.getElementById('photo')
    pht.src = document.getElementById('image').value
}

function revertphoto(){
  var photo = document.getElementById("photo")
  photo.src ="https://shop.roadster.com/assets/car-placeholder-652ae305f4b4afc9eb5f2d976fa0f77979069acb686b0a16fcc062e210367660.png"
}


function loadData(){
var data = JSON.parse(localStorage.getItem('gallery'))
console.log(data)
var result = data.map(function card(dt){
  return `<div class="col-md-3">
  <div class="card position-relative" >
    <img src="${dt.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title d-flex justify-content-sm-start">${dt.make} - ${dt.model}, ${dt.year}</h5>
       <p class="card-text d-flex justify-content-sm-start"><b>Colour</b>- ${dt.color} </p>
       <p class="card-text d-flex justify-content-sm-star"><b>Registration Number</b>- ${dt.regNum}</p>
        <button  class="btn btn-danger dButton">Remove</button>
        <button  class="btn btn-info position-absolute  end-0 me-3" data-bs-toggle="modal" data-bs-target="#editCar" onclick="edit(${data.indexOf(dt)})" >Edit</button>
    </div>
  </div> 
</div>`

})
 document.getElementById('carlist').innerHTML = result.join("")
 createDelete()
   
}
loadData()


function confirmdelete(id){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
       doDelete(id)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}

function doDelete(id){
cars.splice(id,1)
localStorage.setItem('gallery',JSON.stringify(cars))
loadData()
}


function createDelete(){


var buttons = document.querySelectorAll(".dButton");

for (let index = 0; index < buttons.length; index++) {
    buttons[index].onclick = function () {
      confirmdelete(index)
      
 }
}

}
createDelete()

function edit(idx) {
  cars = JSON.parse(localStorage.getItem('gallery'))
  var saveIndex = document.getElementById('saveIndex')
  saveIndex.value = idx

  var mk = document.getElementById('editmake')
  mk.value = cars[idx].make 

  var md = document.getElementById('editmodel')
  md.value = cars[idx].model

  var cl = document.getElementById('editcolor')
  cl.value = cars[idx].color


  var img = document.getElementById('editimage')
  img.value = cars[idx].image

  var yr =  document.getElementById('edityear')
  yr.value = cars[idx].year

  var rn =  document.getElementById('editregNum')
  rn.value = cars[idx].regNum
  
  var pht = document.getElementById('editphoto')
  pht.src = cars[idx].image

}




 var savebtn = document.getElementById('savebtn')
 savebtn.addEventListener('click', function(){
  var mk = document.getElementById('editmake')
  var md = document.getElementById('editmodel')
  var cl = document.getElementById('editcolor')
  var img = document.getElementById('editimage')
  var yr =  document.getElementById('edityear')
  var rn =  document.getElementById('editregNum')

 var  aCar = Object.create(car)

 aCar.make = mk.value
 aCar.model = md.value
 aCar.color = cl.value
 aCar.image = img.value
 aCar.year = yr.value
 aCar.regNum = rn.value
 
 
  
 console.log('here comes the new car')
  // console.log(aCar)

  clear(mk, img, md, rn, yr, cl)
  cars = JSON.parse(localStorage.getItem('gallery'))

  var saveIndex = document.getElementById('saveIndex')
  idx =  saveIndex.value
  cars.splice(idx, 1, aCar)
  console.log(cars)

  localStorage.setItem('gallery',JSON.stringify(cars))
  cfm()
  loadData()
  


  var photo = document.getElementById("editphoto")
  photo.src ="https://shop.roadster.com/assets/car-placeholder-652ae305f4b4afc9eb5f2d976fa0f77979069acb686b0a16fcc062e210367660.png"

 })
  
  