export function removeNonDigits(value: string): string {
  if (typeof value !== 'string') {
    return null;
  }
  return value.replace(/\D/g, '');
}

export function removeSpecialCharacters(value: string): string {
  if (typeof value !== 'string') {
    return null;
  }
  return value.replace(/[^\w\s]/gi, '');
}

export function removeEmptyObjectFromArray(arr: Array<any>): Array<any> {
  let newArr = [];
  if (arr) {
    newArr = arr.filter(item => Object.keys(item).length > 0);
  }
  return newArr;
}

export function removeEmptyValuesInArrayOfObjects(arr: Array<any>): Array<any> {
  if (arr && arr.length) {
    const newArr = arr.map(item => Object.values(item).filter(value => !!value === true)).filter(value => value.length > 0);
    return newArr;
  }
}

export function formatCnpj(value: any): string {
  value = value.toString();
  return `${value.substr(0, 2)}.${value.substr(2, 3)}.${value.substr(
    5,
    3
  )}/${value.substr(8, 4)}-${value.substr(12, 2)}`;
}

export function formatCpf(value: any): string {
  value = value.toString();
  return `${value.substr(0, 3)}.${value.substr(3, 3)}.${value.substr(
    6,
    3
  )}-${value.substr(9, 2)}`;
}

export function toTitleCase(str: string): string {
  const text = str.toLowerCase().split(' ');
  const newText = text.map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });

  return newText.join(' ');
}


export function aplicarMascara(valor: string, mask: string): string {
  if ( ! valor || typeof valor !== 'string' ) { return valor; }
  valor = valor.replace(/\D/g, '');
  const pad = mask.replace(/\D/g, '').replace(/9/g, '_');
  const valorMask = valor + pad.substring(0, pad.length - valor.length);
  let valorMaskPos = 0;

  valor = '';
  for ( let i = 0; i < mask.length; i++) {
    if ( isNaN( parseInt( mask.charAt( i ), 10 ) ) ) {
      valor += mask.charAt(i);
    } else {
      valor += valorMask[valorMaskPos++];
    }
  }

  if (valor.indexOf('_') > -1) {
    valor = valor.substr(0, valor.indexOf('_'));
  }

  return valor;
}
