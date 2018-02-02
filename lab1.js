var callback = function(){


  /******** ALEJANDROS SPACE */

  let register = document.getElementById('register');
  let chatWindow = document.getElementById('chatWindow');
  let loginPopOver = document.getElementById('loginPopOver');
  let logOut = document.getElementById('logOut');

  if (JSON.parse(localStorage.getItem('user')) != null || JSON.parse(localStorage.getItem('user')) != undefined){
    console.log("I'm clicked");
    logOut.style.opacity = '1';
    loginPopOver.style.opacity = '0';
    chatWindow.style.opacity = '1';

    let username = JSON.parse(localStorage.getItem('user')).name;
    scrollToBottom();
  } else {

  register.addEventListener('click',function(){
    console.log("I'm clicked")
    logOut.style.opacity = '1';
    loginPopOver.style.opacity = '0';
    chatWindow.style.opacity = '1';

    let username = document.getElementById('name').value;
    const user = {name: username}; // WE USE THIS CONST TO GET THE USERNAME WITH USER.NAME
    let dataString = JSON.stringify( user );
    window.localStorage.setItem('user', dataString);
    scrollToBottom();
  });
}


  // Man klickar på Send Message, skapas ett objekt som skickas till databasen:

  let sendButton = document.getElementById('sendMessage');
  sendButton.addEventListener('click', function(){
    let date = new Date();
    date = String(date);
    time = date.slice(4,10) + ', ' + date.slice(16,21);
    let message = document.getElementById('message').value;
    let name = JSON.parse(localStorage.getItem('user')).name;
    console.log(time);
    console.log(message);
    console.log(name);

    let object = {  // exempel objekt
      name: name,
      message: message,
      time: time
    };

    console.log(object);

    let db = firebase.database();
    db.ref('messages/').push(object);
    document.getElementById('message').value = '';
  });

  document.getElementById('message').addEventListener('keypress', function(event){
    if (event.key == "Enter"){
      let date = new Date();
      date = String(date);
      time = date.slice(4,10) + ', ' + date.slice(16,21);
      let message = document.getElementById('message').value;
      let name = JSON.parse(localStorage.getItem('user')).name;
      console.log(time);
      console.log(message);
      console.log(name);

      let object = {  // exempel objekt
        name: name,
        message: message,
        time: time
      };

      console.log(object);

      let db = firebase.database();
      db.ref('messages/').push(object);
      document.getElementById('message').value = '';
    }
  });

  // Man prenumererar på ändringar i databasen:
  let db = firebase.database();
  db.ref('messages/').on('value',function(snapshot){
    let allData = snapshot.val();
    console.log("The type of allData is: " + typeof allData)
    console.log("These are all objects :" + allData);
    let messages = document.getElementById("messages");

    while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
    };

    for(let prop in allData) {

    let ms_info = '';
    let ms = '';
    let div = document.createElement('div');
    div.classList.add('ms-box');
    let div2 = document.createElement('div');
    div2.classList.add('ms-info');
    let div3 = document.createElement('div');
    let p = document.createElement('p');
    div3.classList.add('ms');

    let obj = allData[prop];

    ms_info = obj.name + ' / ' + obj.time;
    ms = obj.message;

    div2.innerHTML = ms_info;
    p.innerHTML = ms;
    div3.appendChild(p);

    div.appendChild(div2);
    div.appendChild(div3);

    messages.appendChild(div);
    scrollToBottom();

    };
  });

//Scroll
function scrollToBottom(){
  let chat = document.getElementById('messages');
   chat.scrollTop = chat.scrollHeight - chat.clientHeight;
}


  /* LOG OUT eller GLÖMMA BORT NAMNET */
  logOut.addEventListener('click', function(){
    localStorage.removeItem('user');
    logOut.style.opacity = '0';
    loginPopOver.style.opacity = '1';
    chatWindow.style.opacity = '0';
  });




  /**************************************/

}
window.addEventListener('load', callback);
