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

axios.get('http://localhost:8080/product')
    .then(function (response) {

        response.data.forEach(element => {
            rowCategory.innerHTML += `<tr><td>
        <span class="custom-checkbox">
            <input type="checkbox" id="checkbox1" name="options[]" value="1">
            <label for="checkbox1"></label>
        </span>
    </td>
    <td>${element.nom}</td>
    <td>${element.prix}</td>
    <td>${element.ingrediens}</td>
    <td>${element.codePromo}</td>
    <td><img src="http://localhost:8080/product/image/${element.productImg}" style="width: 100px;"></td>
    <td>
    <a onclick="UpdateProduct('${element._id}')" href="#editEmployeeModal" class="edit" data-toggle="modal" id="editCatg"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
    <a onclick="removeProduct('${element._id}')" href="#deleteEmployeeModal" class="delete" data-toggle="modal" id="DeleteCatg"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
      
    </td></tr>`

        });

    }).catch(function (err) {
        console.log(err);
    });

// --------------get Sub category from db---------------- 
 let SubCategory = document.getElementById('Subcategory');

axios.get('http://localhost:8080/sousCategory')
    .then(function (response) {

        response.data.forEach(element => {
            SubCategory.innerHTML += ` <option value="${element._id}">${element.nom}</option>`

        });

    }).catch(function (err) {
        console.log(err);
    });

    // ---------------------add New Product-------------------- 

let addProduct = document.getElementById('addProduct');

addProduct.addEventListener('click', () => {

    let nameProduct = document.getElementById('nameProduct').value;
    let price = document.getElementById('price').value;
    let ingredients = document.getElementById('ingredients').value;
    let promoCode = document.getElementById('promoCode').value;
    let pics = document.getElementById('pics').files[0];
    let subCat = document.getElementById('Subcategory').value;


    let config = {
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    }
    var formData = new FormData()
    formData.append('nom', nameProduct)
    formData.append('prix', price)
    formData.append('ingrediens', ingredients)
    formData.append('codePromo', promoCode)
    formData.append('sousCategory', subCat)
    formData.append('name', 'file')
    formData.append('file', pics)

    axios.post('http://localhost:8080/product/add', formData, config)
        .then(function (response) {

            const myNotification = new Notification('Notification', {
                body: 'Product added successfully'
            })

            document.getElementById("closeAddProduct").click();
            location.reload();
         
        })
        .catch(function (err) {
            console.log(err);
        });
})

// ---------------------update sub category-------------------- 



// fill input select with the sub categories stored in the database
document.addEventListener("DOMContentLoaded",  () => {
    let Subcategory = document.getElementById('Subcategory1');


axios.get('http://localhost:8080/sousCategory')
    .then(function (response) {

        response.data.forEach(element => {
            Subcategory.innerHTML += `<option value="${element._id}">${element.nom}</option>`
            
        });

    }).catch(function (err) {
        console.log(err);
    });

})


// ---------------------start function update sub category-------------------- 

function UpdateProduct(id) {

 // fill the input text with the selected value  


        axios.get(`http://localhost:8080/product/update/${id}`)
        .then(function (response) {


            document.getElementById('updateNameProduct').value = response.data.nom;
            document.getElementById('updatePrice').value = response.data.prix;
            document.getElementById('updateIngredients').value = response.data.ingrediens;
            document.getElementById('updatePromoCode').value = response.data.codePromo;
            document.getElementById('pics').files[0]=response.data.productImg;

        }).catch(function (err) {
            console.log(err);
        });




    let updateProduct = document.getElementById('updateProduct');

    updateProduct.addEventListener('click', () => {

        let nameProduct = document.getElementById('updateNameProduct').value;
        let price = document.getElementById('updatePrice').value;
        let ingredients = document.getElementById('updateIngredients').value;
        let promoCode = document.getElementById('updatePromoCode').value;
        let pics = document.getElementById('pics').files[0];
        let subCat = document.getElementById('Subcategory1').value;

        // console.log(nameProduct,price,ingredients,promoCode,pics,Subcategory);
       
    let config = {
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    }
    var formData = new FormData()
    formData.append('nom', nameProduct)
    formData.append('prix', price)
    formData.append('ingrediens', ingredients)
    formData.append('codePromo', promoCode)
    formData.append('sousCategory', subCat)
    formData.append('name', 'file')
    formData.append('file', pics)
        axios.put(`http://localhost:8080/product/update/${id}`, formData, config)
            .then(function (response) {

                const myNotification = new Notification('Notification', {
                    body: 'Product updated successfully'
                })

                document.getElementById("closeUpdateProduct").click();
                location.reload();


            }).catch(function (err) {
                console.log(err);



            })
    });



}
// ---------------------delete category--------------------


function removeProduct(id){

    let deleteProduct = document.getElementById('deleteProduct');
    deleteProduct.addEventListener('click', () => {
        axios.delete(`http://localhost:8080/product/delete/${id}`)
        .then(function (response) {
            const myNotification = new Notification('Notification', {
                body: 'Product deleted successfully'
              })
    
                document.getElementById("closeDeleteProduct").click();
                location.reload();


        }).catch(function (err) {
            console.log(err);     
    
    })
    });  

}