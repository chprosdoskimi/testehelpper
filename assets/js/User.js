class User{
  
  constructor(formEl){
    this.formEl = document.getElementById(formEl);
    this.events();
    this.tableUser();
  }

  /** 
   * listUser
   * 
   * Método que lista os usuarios
   * 
   * @param value object
   * @return void
   **/

  listUser(data){
    if(data.length>0){
      const tbody = document.querySelector('tbody');
      let tr='';
      data.map(item => {
        tr += `
        <tr>
        <td>${item.nome}</td>
        <td>${item.sobrenome}</td>
        <td>${item.telefone}</td>
        <td>${item.cep}</td>
        <td>${item.logradouro}</td>
        <td>${item.bairro}</td>
        <td>${item.localidade}</td>
        <td>${item.uf}</td>
        <td><button class="btn btn-danger" onclick="User.deleteUser(${item.id})">Delete</button></td>
      </tr>`;
        
      });
      tbody.insertAdjacentHTML('afterend',tr);
    }

  }

  /** 
   * tableUser
   * 
   * Método que captura os dados na api
   * 
   * @param value void
   * @return void
   **/
  tableUser(){

    Request.call('https://60988a1099011f001713f0d1.mockapi.io/api/v1/users')
    .then(response => response.json())
    .then((data)=>{
      this.listUser(data);
    })
    .catch((err)=>{
      console.log('err: ', err);
    });
    
  }



 

  /** 
   * events
   * 
   * Método que captura o evento no formulário
   * 
   * @param value void
   * @return void
   **/
  events(){
    if(this.formEl)
      this.formEl.addEventListener("submit", evt =>this.handleSubmit(evt));
    
    document.addEventListener('reset', e =>{
      this.formEl.reset();
    })
  }

  /** 
   * handleSubmit
   * 
   * Método que chama a validação e adiciona o usuário
   * 
   * @param value elemento
   * @return void
   **/

  handleSubmit(e){
    e.preventDefault();
    const validForm = this.isValid();

    if(validForm){
      let user = this.userValues();
      this.addUser(user);
    }
  }

  /** 
   * isValid
   * 
   * Método que verifica se os campos são válidos
   * 
   * @param value void
   * @return void
   **/

  isValid(){

    let valid = true;

    for(let errorText of document.querySelectorAll('.error-text')){
      errorText.remove();
    }
    for(let field of this.formEl.querySelectorAll('.isValid')){
      // let label = field.previousElementSibling.innerText;
      if(!field.value){
        
        new MakeError(field,`O campo "${field.name}" não pode estar em branco`);
       
        valid=false;
      }
      if(field.id==='inputCpf'){
        if(field.value !==""){
          if(!this.validateCpf(field)) valid = false;
        }
      }
    }

    return valid;
  }

  /** 
   * validateCpf
   * 
   * Método que valida o cpf, e mostra o erro se tiver
   * 
   * @param value element
   * @return bool
   **/
  validateCpf(field){
    let cpfValue = field.value;
    const cpf = new ValidateCPF(cpfValue);

    if(!cpf.valid()){
      
      new MakeError(field,'CPF inválido')

      return false;

    }
    return true;
  }

  /** 
   * listUser
   * 
   * Método que cria um objeto User
   * 
   * @param value user
   * @return object
   **/
  userValues(){
    let user ={}
    for(let field of this.formEl.querySelectorAll('.form-control')){
      console.log(field.name);
      user[field.name] = field.value;
    }
    return user;
  }

  /** 
   * addUser
   * 
   * Método que envia o user para a api
   * 
   * @param value object
   * @return void
   **/

  addUser(user){
    fetch(`https://60988a1099011f001713f0d1.mockapi.io/api/v1/users`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json())
    .then((data)=> {
      console.log('data: ', data);
      location.reload();
    })
    .catch((err)=>{
      console.log('err: ',err)
    });
  }
   
  /** 
   * deleteUser
   * 
   * Método estático que deleta o usuario
   * 
   * @param value number
   * @return void
   **/
  static deleteUser(id){
    console.log('delete user: ', id);
    Request.call(`https://60988a1099011f001713f0d1.mockapi.io/api/v1/users/${id}`,'DELETE')
    .then(response => response.json())
    .then((data)=> {
      console.log(data)
      location.reload();
      
    })
    .catch((err)=>{
      console.log('err: ',err)
    });
    
  }
}