//  EFEITOS NOS INPUTS
const inputs = document.querySelectorAll(".input");

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

let pwd = document.getElementById('pwd')
let eye = document.getElementById('eye')
let eye2 = document.getElementById('eye2')

function showHide() {
  if (pwd.type == 'password') {
    pwd.setAttribute('type', 'text')
    eye.classList.add('hide')
    eye2.classList.remove('hide')
  }
  else {
    pwd.setAttribute('type', 'password')
    eye.classList.remove('hide')
    eye2.classList.add('hide')
  }
}


//  VALIDAÇÃO DO LOGIN
let email = document.forms['form']['email']
let senha = document.forms['form']['senha']


function logar () {
  if (email.value != "admin") {
    Swal.fire({
      icon: "error",
      title: "Usuário inválido!", 
      text: "",
      didClose: () => {
      email.focus()}
    })    
    return false    
  }
  if (senha.value != "admin") {
    Swal.fire({
      icon: "error",
      title: "Senha inválida!", 
      text: "",
      didClose: () => {
      senha.value = '' 
      senha.focus()}
    })
    return false
  }
  else {    
    Swal.fire({
      icon: "success",
      title:`Bem vindo, ${email.value}!`, 
      text: "Login efetuado com sucesso!",
      didClose: () => {
      window.location.href = "home.html"}
    })
    return false
  }
}