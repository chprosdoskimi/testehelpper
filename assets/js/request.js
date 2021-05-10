class Request{
  /** 
   * call
   * 
   * Método que pega a url e o verbo HTTP
   * 
   * @param value object
   * @return void
   **/
  static call(url,method="GET"){
    
    const headers={
      
      method: method,
      mode:'cors',
      redirect:"follow"
    }

   return fetch(url, headers)
  }
}