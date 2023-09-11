


// SIGN UP FORM
function saveData(){
    let username,email,password;
    username= document.getElementById("username").value;
    email= document.getElementById("email").value;
    password= document.getElementById("password").value;
   
//     localStorage.setItem("username", username);
//     localStorage.setItem("email", email);
//     localStorage.setItem("password", password);

 let user_data= new Array();
 user_data=JSON.parse(localStorage.getItem("users"))? JSON.parse(localStorage.getItem("users")):[];
 if(username=="" || password=="" || email==""){
    alert("Fill the all fields");
}
 else if(user_data.some((data =>{
    return data.username==username;
 }))){
     alert("Duplicate Username Entry");
 }
 else{
    user_data.push({
        "username" :username,
        "email":email,
        "password":password,
    })
    localStorage.setItem("users", JSON.stringify(user_data));
    window.location.href="signin.html";
 }
}
function goTo_signIn(){
   window.location.href="signin.html";
}




// SIGN IN FORM
function saveData1(){
    let username,password;
    username=document.getElementById("username").value;
    password=document.getElementById("password").value;

    let user_record = new Array();
    user_record = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];
    if(user_record.some(data =>{
       return data.username == username && data.password == password;
    })){
        alert("login success");
        let fill= user_record.filter((data)=>{
            return data.username==username&&data.password==password;
        })[0]

        localStorage.setItem("username" , fill.username);
        localStorage.setItem("password" , fill.password);
         window.location.href="notes.html";
       
    }
    else if(username=="" || password==""){
       alert("Fill the all fields");
    }
    else{
        alert("Check the username or password");
    }
}
function goTo_signUp(){
    window.location.href="index.html";
 }





//// LOGOUT
 function signout(){
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    window.location.href="signin.html";
 }









////// NOTES APP FUNCTIONALITY

let addButton= document.getElementById("addbox");
let row = document.getElementById("row");

    //CREATE NOTES
addButton.addEventListener("click" , createNote);

function createNote(){
    let notes = localStorage.getItem("notes");
    let noteHeading= "note heading";
    let noteText = "note text";

    if(notes==null || notes==""|| notes.length===0){
       notesObj = [];

       let htmlCode = `<div class="col-4">
       <div class="note-box">
         <textarea class="form-control noteheading">${noteHeading}</textarea>
         <div class="note-container">
            <textarea class="form-control notedata">${noteText}</textarea>
         </div>
         <div class="noteaction">
             <i class="fa-regular fa-floppy-disk savebtn0" id="savebtn"></i>
             <i class="fa-regular fa-trash-can deletebtn0" id="deletebtn"></i>
         </div>
         </div>
       </div>`;
    row.innerHTML += htmlCode;
    }
    else{
        notesObj=JSON.parse(notes);    
    }

    let myObj= JSON.parse(localStorage.getItem("notes"));
    myObj = {
        title:noteHeading,
        details:noteText,
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


/// SHOW NOTES
function showNotes(){
  let notes= localStorage.getItem("notes");

  if(notes==null){
     notesObj= [];
  }
  else{
    notesObj = JSON.parse(notes);
  }

  let html= "";

  notesObj.forEach(function (element,index){

     html+= `<div class="col-lg-4">
              <div class="note-box">
                    <textarea class="form-control noteheading" id="noteheading${index+1}" onchange="saveNote(${index+1})"> ${element.title} </textarea>
                    <div class="note-container">
                        <textarea class="form-control notedata" id="notetext${index+1}" onchange="saveNote(${index+1})" > ${element.details} </textarea>
                    </div>
                    <div class="noteaction">
                        <i class="fa-regular fa-floppy-disk savebtn0" id="${index+1}" onclick="saveNote(this.id)"></i>
                        <i class="fa-regular fa-trash-can deletebtn0" id="${index+1}" onclick="deleteNote(this.id)"></i>
                    </div>
               </div>
             </div>`;
  });

  if(notesObj.length != 0){
     row.innerHTML = html;
  }
  else {
    row.innerHTML = `<h4>Click to add The Notes</h4>`;
  }
 
}

//// DELETE NOTES
 function deleteNote(index){
     notesObj.splice(index-1,1);
     localStorage.setItem("notes", JSON.stringify(notesObj));
     showNotes();
 }


//// SAVE NOTES

function saveNote(index){
   let notes = localStorage.getItem("notes");

   if(notes === null){
      notesObj =[];
   }
   else{
    notesObj = JSON.parse(notes);
   }

   let notesHeading = document.getElementById(`noteheading${index}`);
   let notesDetails = document.getElementById(`notetext${index}`);

   notesObj[index-1] = {
     ...notesObj[index-1],
     title: notesHeading.value,
     details: notesDetails.value,
   };
   console.log(notesObj);
   localStorage.setItem("notes", JSON.stringify(notesObj));
   showNotes();
}
showNotes();


