export function isCpfValid(cpf: string): boolean {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  
    const values = cpf.split('').map(el => +el);
    const rest = (count: number) => (values.slice(0, count - 1).reduce((sum, el, index) => sum + el * (count - index), 0) * 10) % 11;
  
    return rest(10) === values[9] && rest(11) === values[10];
}

// Validação de CNPJ
export function isCnpjValid(cnpj: string): boolean {
    if (typeof cnpj !== 'string') return false;
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false;
  
    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
  
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }
  
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
  
    size += 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
  
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }
  
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
}