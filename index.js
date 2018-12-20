var readlineSync = require('readline-sync');
var fs = require('fs');
var contacts = [];
function loadData(){
  var fileContent = fs.readFileSync('./data.json');
  contacts = JSON.parse(fileContent);
}
function showMenu(){
  console.log("1. Create a new contact");
  console.log("2. Fix contact");
  console.log("3. Delete");
  console.log("4. Search");
  console.log("5. ShowAll");
  var option = readlineSync.question('> ');
  switch (option) {
    case '1':
      var name = readlineSync.question('Name: ');
      var phoneNumber = readlineSync.question('PhoneNumber: ');
      createContact(name,phoneNumber);
      break;
    case '2':
      var name = readlineSync.question('Name: ');
      fixContact(name);
      break;
    case '3':
      var name = readlineSync.question('Name: ');
      deleteContact(name);
      break;
    case '4':
      var name = readlineSync.question('Name: ');
      searchContact(name);
      break;
    case '5':
      showAll();
      break;
    default:
      console.log("Wrong Option!");
      showMenu();
      break;

  }
}
function createContact(name,phoneNumber){
  contacts.push({name: name, phone: phoneNumber});
  saveContact();
  console.log('created!');
};
function saveContact(){
  var content = JSON.stringify(contacts);
  fs.writeFileSync('./data.json',content,{encoding: 'utf8'});
}
function fixContact(name){
  for(var i=0;i<contacts.length; i++){
    if (name.toUpperCase() === contacts[i].name.toUpperCase()){
      var newPhone = readlineSync.question('newPhone: ');
      contacts[i].phone = newPhone;
      console.log("update!");
      saveContact();
    }
  }
}
function deleteContact(name){
  for(var i=0;i<contacts.length; i++){
    if (name.toUpperCase() === contacts[i].name.toUpperCase()){
      contacts.splice(i, 1);
      console.log("deleted!");
      saveContact();
    }
  }
}
function searchContact(name){
  for(var i=0;i<contacts.length; i++){
    if (name.toUpperCase() === contacts[i].name.toUpperCase()){
      console.log(contacts[i].name);
      console.log(contacts[i].phone);
    } 
  }
}
function showAll(){
  console.log(contacts);
}

function main(){
  loadData();
  showMenu();
};
main();
