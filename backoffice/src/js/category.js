$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});

// --------------get category from db---------------- 

let rowCategory = document.getElementById('row');

axios.get('http://localhost:8080/category')
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
    <a onclick="update('${element._id}')" href="#editEmployeeModal" class="edit" data-toggle="modal" id="editCatg"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
    <a onclick="remove('${element._id}')" href="#deleteEmployeeModal" class="delete" data-toggle="modal" id="DeleteCatg"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
      
    </td></tr>`
       
    });
    
}).catch(function (err) {
    console.log(err);
});

// ---------------------add category-------------------- 

let addCategory = document.getElementById('addCategory');

addCategory.addEventListener('click', () => {

    let nameCategory = document.getElementById('nameCategory').value;
    var obj =     {
        nom : nameCategory
       }
    axios.post('http://localhost:8080/category/add',obj)
    .then(function(response){

        const myNotification = new Notification('Notification', {
            body: 'Category added successfully'
          })

        document.getElementById("closeAdd").click();
        location.reload();

})
.catch(function (err) {
    console.log(err);
});
})
// ---------------------update category-------------------- 


function update(id){
axios.get(`http://localhost:8080/category/${id}`)
.then(function (response) {

    let ctgNameToUpdate = document.getElementById('ctgNameToUpdate').value = ` ${response.data.nom}`


}).catch(function (err) {
    console.log(err);
});

let updateCategory = document.getElementById('updateCategory');

updateCategory.addEventListener('click', () => {
 

    let ctgNameUpdated = document.getElementById('ctgNameToUpdate').value;

    var obj =     {
        nom : ctgNameUpdated
       }

    axios.put(`http://localhost:8080/category/update/${id}`,obj)
    .then(function (response) {

        const myNotification = new Notification('Notification', {
            body: 'Category updated successfully'
          })

            document.getElementById("closeUpdate").click();
            location.reload();
       
    
    }).catch(function (err) {
        console.log(err);  
    
    

})
});  
}


// ---------------------delete category--------------------


function remove(id){

    let deleteCategory = document.getElementById('deleteCategory');
    deleteCategory.addEventListener('click', () => {
        axios.delete(`http://localhost:8080/category/delete/${id}`)
        .then(function (response) {
            const myNotification = new Notification('Notification', {
                body: 'Category deleted successfully'
              })
    
                document.getElementById("closeDelete").click();
                location.reload();


        }).catch(function (err) {
            console.log(err);     
    
    })
    });  

}