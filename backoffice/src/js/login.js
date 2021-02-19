login = document.getElementById('login');

login.addEventListener('click', () => {

    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    
    
    if(user == "admin" && password =="admin"){

      window.location.href="Category.html";
    
    }
    else{
      alert("Username or Password invalid !!!!!!!!!!");
     }
})
// ------------------------------------------------------------------

