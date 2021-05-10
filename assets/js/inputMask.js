const cpf = document.getElementById('inputCpf');
const age = document.getElementById('inputAge');
const cep = document.getElementById('inputCep');
const tel = document.getElementById('inputPhone');

//Capturando eventos no cpf
cpf.addEventListener('keypress', (e)=> maskCpf(e.target.value));
cpf.addEventListener('change', (e)=> maskCpf(e.target.value));
//capturando eventos na idade
age.addEventListener('keypress',(e)=>maskAge(e.target.value));
age.addEventListener('change',(e)=>maskAge(e.target.value));
//capturando eventos no cep
cep.addEventListener('keypress',(e)=>maskCep(e.target.value));
cep.addEventListener('change',(e)=>maskCep(e.target.value));

tel.addEventListener('keypress', (e) => maskTellphone(e.target.value)) // Dispara quando digitado no campo
tel.addEventListener('change', (e) => maskTellphone(e.target.value)) // Dispara quando autocompletado o campo

const maskTellphone = (valor) => {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
    tel.value = valor // Insere o(s) valor(es) no campo
}

function maskCpf(value){
  value = value.replace(/\D/g,"");
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4");

  cpf.value = value
}

function maskAge(value){
  value = value.replace(/\D/g,"");
  age.value = value;
}

function maskCep(value){
  value = value.replace(/\D/g,"");
  value = value.replace(/(\d{5})(\d{3})/,"$1-$2");

  cep.value = value;
}