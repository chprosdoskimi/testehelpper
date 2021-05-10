class ValidateCEP{
  constructor(cepEl){
    this.cepEl = document.getElementById(cepEl);
    this.events();
  }
  
  /** 
   * cepIsValid
   * 
   * Método que captura os eventos no elemento do cep
   * 
   * @param value void
   * @return void
   **/

  events(){
    if(this.cepEl) this.cepEl.addEventListener('keyup',(e)=> this.fetchCep(e.target.value));
  
  }

  /**
   * showData
   * 
   * Método que insere os dados da api via cep no resto dos campos do Endereço
   * 
   * @param value object
   * @return void
   */
  showData(result){

    document.getElementById("inputStreet").value = result.logradouro || '' ;
    document.getElementById("inputCity").value = result.localidade || '';
    document.getElementById("inputDistrict").value = result.bairro || '';
    document.getElementById("inputUf").value = result.uf ||'';

  }
  
  /** 
   * fetchCep
   * 
   * Método que captura os dados da api do via cep
   * 
   * @param value string
   * @return void
   **/
 fetchCep(value){

    let search = value.replace("-","")
    // const options = {
    //   method: 'GET',
    //   mode:'cors',
    //   redirect:"follow"
    // }
    
    // fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    Request.call(`https://viacep.com.br/ws/${search}/json/`)
    .then(response => response.json())
    .then((data)=>{
      console.log('data: ', data);
      
      if(data.erro){
        new MakeError(this.cepEl,'CEP Inválido');
        return this.cepIsValid(false);
      }  
      else{
        this.showData(data);
        return this.cepIsValid(true);
      }
    })
    .catch((err)=>{
      console.log('err: ', err);
    });

  }
  /** 
   * cepIsValid
   * 
   * Método que retorna um boolean se o cep estiver válido ou inválido
   * 
   * @param value boolean
   * @return boolean
   **/

  cepIsValid(bool){
    return bool;
  }
}

let validateCep = new ValidateCEP('inputCep');