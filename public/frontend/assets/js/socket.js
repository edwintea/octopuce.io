window.onclick = function(e) {
    //for test
    //socket.emit('server', {name:localStorage.getItem('name'),email:localStorage.getItem('email'),message:"Triggered"});
};

const generateRandomString = (length=6) => Math.random().toString(20).substr(2, length);

window.onload = function () {

  /*
  socket.emit('client', {name:localStorage.getItem('name'),email:localStorage.getItem('email'),message:page});

  let email = "";
  if (localStorage.getItem("email")) {
    email = localStorage.getItem("email");
  } else {
    email = generateRandomString(8);
    localStorage.setItem("email",email);
  } 

  var obj={
    "name": localStorage.getItem('name'),
    "email": localStorage.getItem('email'),
    "message"   : localStorage.getItem('name')+" has connected!"
  }

  socket.on('server', function (data) {
    console.log({point:"Trigger to server",data:data})
  });

  socket.on('client', function(data) {
    console.log({point:"Trigger from server",data:data})
    
    try{
      if(data.message!='index'){
        
        let prefix="Hi "
        if(data.email != localStorage.getItem('email')){
          prefix="";
        }
        notify(prefix+data.name+' '+data.message,'info')
      }
      
    }catch(e){
      console.log(e)
    }
	  
  });
  */
}