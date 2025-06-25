const sectionInsert = document.getElementById("insert")
const sectionUpdate = document.getElementById("update")
sectionUpdate.style.display = "none"; // por defecto estara oculto


function deleteTravel(id) {
    // console.log(id);
    fetch (`/delete/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        response.json()
        })
    .then(data => {
        location.reload()  
    })
    .catch(err => console.log(err))
}


function editTravel(travel){
    sectionInsert.style.display = "none";
    sectionUpdate.style.display = "block";

    const newTravel = JSON.parse(travel)
    // console.log(newTravel.lugar);
}