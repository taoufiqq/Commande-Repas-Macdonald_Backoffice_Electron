$(document).ready(function () {
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
        if (this.checked) {
            checkbox.each(function () {
                this.checked = true;
            });
        } else {
            checkbox.each(function () {
                this.checked = false;
            });
        }
    });
    checkbox.click(function () {
        if (!this.checked) {
            $("#selectAll").prop("checked", false);
        }
    });
});

// --------------get Sub category from db---------------- 

let rowCategory = document.getElementById('row');

axios.get('http://localhost:8080/sousCategory')
    .then(function (response) {

        response.data.forEach(element => {
            rowCategory.innerHTML += `<tr><td>
        <span class="custom-checkbox">
            <input type="checkbox" id="checkbox1" name="options[]" value="1">
            <label for="checkbox1"></label>
        </span>
    </td>
    <td>${element.nom}</td>
    <td>
    <a onclick="UpdateSubCategory('${element._id}')" href="#editEmployeeModal" class="edit" data-toggle="modal" id="editCatg"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
    <a onclick="removeSubCategory('${element._id}')" href="#deleteEmployeeModal" class="delete" data-toggle="modal" id="DeleteCatg"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
      
    </td></tr>`

        });

    }).catch(function (err) {
        console.log(err);
    });
// --------------get category from db---------------- 

let Category = document.getElementById('category');

axios.get('http://localhost:8080/category')
    .then(function (response) {

        response.data.forEach(element => {
            Category.innerHTML += ` <option value="${element._id}">${element.nom}</option>`

        });

    }).catch(function (err) {
        console.log(err);
    });
// ---------------------add Sub category-------------------- 

let addSubCategory = document.getElementById('addSubCategory');

addSubCategory.addEventListener('click', () => {

    let nameSubCategory = document.getElementById('nameSubCategory').value;
    let category = document.getElementById('category').value;

    var obj = {
        nom: nameSubCategory,
        category: category
    }
    axios.post('http://localhost:8080/sousCategory/add', obj)
        .then(function (response) {

            const myNotification = new Notification('Notification', {
                body: 'Category added successfully'
            })

            document.getElementById("closeAddSubCategory").click();
            location.reload();

        })
        .catch(function (err) {
            console.log(err);
        });
})

// ---------------------update sub category-------------------- 



// fill input select with the categories stored in the database
document.addEventListener("DOMContentLoaded",  () => {
    let category1 = document.getElementById('category1');


axios.get('http://localhost:8080/category')
    .then(function (response) {

        response.data.forEach(element => {
            category1.innerHTML += `<option value="${element._id}">${element.nom}</option>`
            
        });

    }).catch(function (err) {
        console.log(err);
    });

})


// ---------------------start function update sub category-------------------- 

function UpdateSubCategory(id) {

 // fill the input text with the selected value  


        axios.get(`http://localhost:8080/sousCategory/update/${id}`)
        .then(function (response) {

            document.getElementById('SubctgNameToUpdate').value = response.data.nom

        }).catch(function (err) {
            console.log(err);
        });




    let updateSubCategory = document.getElementById('updateSubCategory');

    updateSubCategory.addEventListener('click', () => {


        let SubctgNameToUpdate = document.getElementById('SubctgNameToUpdate').value;

        let category1 = document.getElementById('category1').value;

    var obj = {
        nom: SubctgNameToUpdate,
        category: category1
    }

        axios.put(`http://localhost:8080/sousCategory/update/${id}`, obj)
            .then(function (response) {

                const myNotification = new Notification('Notification', {
                    body: 'Sub Category updated successfully'
                })

                document.getElementById("closeUpdateSubCategory").click();
                location.reload();


            }).catch(function (err) {
                console.log(err);



            })
    });



}



// ---------------------delete category--------------------


function removeSubCategory(id){

    let deleteSubCategory = document.getElementById('deleteSubCategory');
    deleteSubCategory.addEventListener('click', () => {
        axios.delete(`http://localhost:8080/sousCategory/delete/${id}`)
        .then(function (response) {
            const myNotification = new Notification('Notification', {
                body: 'Category deleted successfully'
              })
    
                document.getElementById("closeDeleteSubCatg").click();
                location.reload();


        }).catch(function (err) {
            console.log(err);     
    
    })
    });  

}