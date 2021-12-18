const input = document.querySelector('input');
const log1 = document.getElementById('mask');
const log2 = document.getElementById('valorReal');


input.addEventListener('input', updateValue);

function updateValue(e) {
  let value = e.target.value
  let maskedValue = ''
  let precision = 2
  let decimalSeparator = ','
  let milesimoSeparator = '.'

  let prefix = 'R$'
  let suffix = ''

  if(value.length == 0) {
  value = 0,
  maskedValue = ''
  }

  if (value === null || value === undefined ) {
  value = 0,
  maskedValue = ''
  return 
  }

  //se o valor fornecido é um número, vamos converter em string para manipular isso
  value = String(value); 


  if (value.length == 0) {
  value = 0,
  maskedValue = ''
  return 
  }

  // extrair dígitos do tipo number.. 
  // se não houver, preencha um zero.
  let digits = value.match(/\d/g) || ['0'];



  // zero-pad a input
  // adicionar 0 ao inicio
  while (digits.length <= precision) { 
    digits.unshift('0') 
  }



  if (precision > 0) {
  // adiciona separador decimal 
  digits.splice(digits.length - precision, 0, ".");
  }

  // limpe dígitos estranhos, como zeros à esquerda.
  digits = Number(digits.join('')).toFixed(precision).split('');

  // valor puro  
  let raw = Number(digits.join(''));


  // -1 necessário para posicionar o separador decimal antes dos dígitos.
  let decimalpos = digits.length - precision - 1;  


  if (precision > 0) {
    // definir o separador decimal final
    digits[decimalpos] = decimalSeparator;
  } else {
    // quando a precisão é 0, não há separador decimal.
    decimalpos = digits.length;
  }

  // adiciona . em milesimo
  for (let x=decimalpos - 3; x > 0; x = x - 3) {
  digits.splice(x, 0, milesimoSeparator);
  }



  //se tivermos um prefixo ou sufixo, adicione-os.
  if (prefix.length > 0) { 
    digits.unshift(prefix)
  }

  if (suffix.length > 0) {
    digits.push(suffix) 
  }


  // atribuicoes dos valores
  value =  raw
  maskedValue = digits.join('').trim()
  
  //mostrar no front
  log1.textContent = maskedValue
  log2.textContent = value
  input.value = maskedValue
}
