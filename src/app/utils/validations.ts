import { AbstractControl } from "@angular/forms";

/**
 * Classe para validar valores fora de um form
 */

export class Validations {

  static formatBrazilDateToJsObject(date: any): Date {
    const from = date.split('/');
    return new Date(from[2], from[1] - 1, from[0]);
  }

  /**
   * @param control
   * Form control onde será feita a validação
   * @description
   * Valida se o valor é uma sequencia de caracteres iguais
   */
  static rejectSequence( value: string ): boolean {
    if ( value ) {
      const newValue = value.replace(/\D/g, '');

      const regex = /^(\d)\1+$/;
      return regex.test( newValue ) ? true : false;
    }
    return false;
  }


  static minAgeInvalid( date: string, minAge: number ): boolean {
    const typedDate = Validations.formatBrazilDateToJsObject( date );

    const ageDifMs = Date.now() - typedDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const diffYears = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (diffYears < minAge) {
      return true;
    }

    return false;
  }

  static maxAgeInvalid( date: string, maxAge: number ): boolean {
    const typedDate = Validations.formatBrazilDateToJsObject( date );
    const ageDifMs = Date.now() - typedDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const diffYears = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (diffYears >= maxAge) {
      return true;
    }

    return false;
  }

  static cpfIvalid( cpf: string ): boolean {
    if ( !cpf ) {
      return true;
    }

    if ( this.rejectSequence( cpf )) {
      return true;
    }

    let soma: number;
    let resto: number;
    let invalid: boolean;

    soma = 0;

    // const regex = new RegExp('[0-9]{11}');

    // if (
    //   cpf === '00000000000' ||
    //   cpf === '11111111111' ||
    //   cpf === '22222222222' ||
    //   cpf === '33333333333' ||
    //   cpf === '44444444444' ||
    //   cpf === '55555555555' ||
    //   cpf === '66666666666' ||
    //   cpf === '77777777777' ||
    //   cpf === '88888888888' ||
    //   cpf === '99999999999' ||
    //   !regex.test(cpf)
    // ) {
    //   return true;
    // }


    for (let i = 1; i <= 9; ++i) {
      soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10), 10)) {
      return invalid = true;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11), 10)) {
      return invalid = true;
    }

    return invalid = false;
  }


  static cnpjInvalid( _cnpj: string ): boolean {
    if ( !_cnpj ) {
      return true;
    }

    const cnpj = _cnpj.replace(/[^\d]+/g, '');

    if ( this.rejectSequence( cnpj )) {
      return true;
    }

    // Valida a quantidade de caracteres
    if (cnpj.length !== 14) {
      return true;
    }

    // Elimina inválidos com todos os caracteres iguais
    if (/^(\d)\1+$/.test(cnpj)) {
      return true;
    }

    // Cáculo de validação
    const t = cnpj.length - 2;
    const d = cnpj.substring(t);
    const d1 = parseInt(d.charAt(0), 10);
    const d2 = parseInt(d.charAt(1), 10);
    const calc = x => {
      const n: any = cnpj.substring(0, x);
      let y = x - 7;
      let _s = 0;
      let r = 0;

      for (let i = x; i >= 1; i--) {
        _s += n.charAt( x - i ) * y--;
        if (y < 2) {
          y = 9;
        }
      }

      r = 11 - (_s % 11);
      return r > 9 ? 0 : r;
    };

    if (calc(t) === d1 && calc(t + 1) === d2) {
      return false;
    }

    return true;
  }

  static hasRequiredField (abstractControl: AbstractControl): boolean {

    if (abstractControl && abstractControl.validator) {
      console.log( abstractControl.validator );
      // const validator = abstractControl.validator({}as AbstractControl);
      // if (validator && validator.required) {
      //   return true;
      // }
    }

    if (abstractControl && abstractControl['controls']) {
      for (const controlName in abstractControl['controls']) {
        if (abstractControl['controls'][controlName]) {
          if (this.hasRequiredField(abstractControl['controls'][controlName])) {
            return true;
          }
        }
      }
    }
    return false;
  }

}
