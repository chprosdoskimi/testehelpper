class ValidateCPF {
  constructor(cpfSent) {
    Object.defineProperty(this, 'cpfEmpty', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfSent.replace(/\D+/g, '')
    });
  }

  /** 
   * sequence
   * 
   * 
   * 
   * @param value void
   * @return void
   **/
  sequence() {
    return this.cpfEmpty.charAt(0).repeat(11) === this.cpfEmpty;
  }

  /** 
   * cepIsValid
   * 
   * Método que captura os eventos no elemento do cep
   * 
   * @param value void
   * @return void
   **/
  generateNewCpf() {
    const cpfWithoutDigit = this.cpfEmpty.slice(0, -2);
    const digit1 = ValidateCPF.generateDigit(cpfWithoutDigit);
    const digit2 = ValidateCPF.generateDigit(cpfWithoutDigit + digit1);
    this.newCPF = cpfWithoutDigit + digit1 + digit2;
  }

  /** 
   * cepIsValid
   * 
   * Método estático que gera o digito para verificação
   * 
   * @param value string
   * @return string
   **/
  static generateDigit(cpfWithoutDigit) {
    let total = 0;
    let reverse = cpfWithoutDigit.length + 1;

    for(let stringNumber of cpfWithoutDigit) {
      total += reverse * Number(stringNumber);
      reverse--;
    }

    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : '0';
  }

  /** 
   * valid
   * 
   * Método que verifica se o cpf é válido ou não
   * 
   * @param value void
   * @return string
   **/

  valid() {
    if(!this.cpfEmpty) return false;
    if(typeof this.cpfEmpty !== 'string') return false;
    if(this.cpfEmpty.length !== 11) return false;
    if(this.sequence()) return false;
    this.generateNewCpf();

    return this.newCPF === this.cpfEmpty;
  }
}