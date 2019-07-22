import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { Validations } from './../../utils/validations';
import * as FormatTo from './../../utils/format-to';


export class FormValidations extends Validators {
  static getErrorMsg(
    fieldName: string,
    checktorName: string,
    checktorValue?: any
  ) {
    if (fieldName) {
      fieldName = fieldName.toLowerCase();
    }

    const config = {
      required: `Campo obrigatório.`,
      email: `E-mail inválido.`,
      minlength: `Mínimo de ${checktorValue.requiredLength} caracteres.`,
      maxlength: `Máximo de ${checktorValue.requiredLength} caracteres.`,
      minLengthMasked: `Mínimo de ${checktorValue} caracteres`,
      cepInvalido: 'CEP inválido.',
      dateInvalid: 'Data inválida',
      rejectSequence: 'Dado inválido',
      onlyNumbers: 'Só são permitidos números',
      moreThanOne: 'Só são permitidos números maiores que 1',
      lessThanTheRegistredDate: `Não pode ser anterior à data informada ${checktorValue}`,
      invalidLoginPassword: 'Senha não pode conter partes do login',
      noFutureDate: 'A data não pode ser futura',
      differFrom: `Valor não pode ser igual ao de ${checktorValue}`,
      pattern: 'Campo inválido',
      atLeastOne: `Preencha ao menos um dos campos ${checktorValue}`,
      reset: 'Senhas não são idênticas',
      validaCpf: 'Este CPF é inválido',
      validaCnpj: 'Este CNPJ é inválido',
      levenshtein: 'Apenas correção ortográfica',
      hourValidator: 'Horário inválido',
      minAge: `Data não pode ser menor que ${checktorValue} ano(s)`,
      maxAge: `Data não pode ser maior que ${checktorValue} ano(s)`,
      verifySameValueField: `Valor não pode ser igual ao inicial`,
      verifyRegisteredEmail: `Favor inserir e-mail que não tenha fatura por email cadastrada.`,
      min: `Quantidade informada de ${ checktorValue.actual } menor que a mínima
            permitida (${checktorValue.min}) para a área construida --area--`,

      potMin: `Potência informada de ${ checktorValue.actual } menor que a mínima
            permitida (${checktorValue.min})`,
      notnull: `O campo ${ fieldName } é obrigatório`,
      allowedMotors: `${ fieldName } O motor selecionado não é permitido`,
      maxHP: `Potência de motor declarada, maior que o permitido`,
      ctMinLength: 'Campo obrigatório'
    };

    return config[checktorName];
  }

  /**
   * @description
   * Para não usar a msg de retorno do required??
   * REVER
   */
  static notNull(control: FormControl) {
    const sequence = control.value;

    if ( !sequence ) {
      return  { notnull: true };
    }
    return null;
  }


  static verifySameValueField(value: string) {
    const checktor = (formControl: FormControl) => {
      const field = formControl.value;
      if (value.toLowerCase() === field.toLowerCase()) {
        return {verifySameValueField: true};
      }
      return null;
    };
    return checktor;
  }

  static verifyRegisteredEmail(value: string) {
    const checktor = (formControl: FormControl) => {
      const field = formControl.value;
      if (value.toLowerCase() === field.toLowerCase()) {
        return {verifyRegisteredEmail: true};
      }
      return null;
    };
    return checktor;
  }

  static requiredMinCheckbox(min = 1) {
    const checktor = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => (current ? total + current : total), 0);
      return totalChecked >= min ? null : { required: true };
    };
    return checktor;
  }

  /**
   * @param control
   * Form control onde será feita a validação
   * @description
   * Valida se o valor é uma sequencia de caracteres iguais
   */
  static rejectSequence(control: FormControl) {
    const sequence = control.value;
    if (sequence) {
      const newValue = sequence.replace(/\D/g, '');

      const regex = /^(\d)\1+$/;
      return regex.test(newValue) ? { rejectSequence: true } : null;
    }
    return null;
  }

  /**
   * @param control
   * Form control onde será feita a validação
   * @description
   * Valida se o email é válido
   */
  static emailValidator(control: FormControl) {
    const email = control.value.toLowerCase();
    const regex = /[\w-]+@([\w-]+\.)+[\w-]+/;
    const isValid = regex.test(email);

    if (email) {
      return isValid ? null : { email: true };
    }
    return null;
  }
  /**
   * @param control
   * Form control onde será feita a validação
   * @description
   * Valida se o valor é um CEP válido
   */
  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const checkcep = /^[0-9]{8}$/;
      return checkcep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  /**
   * @param control
   * Form control onde será feita a validação
   * @description
   * Valida se a data é válida
   */
  static dateValidator(control: FormControl) {
    const date = control.value;
    if (date) {
      const parms = date.split(/[\.\-\/]/);
      const year = parseInt(parms[2], 10);
      const month = parseInt(parms[1], 10);
      const day = parseInt(parms[0], 10);

      const checkDate = new Date(year, month - 1, day, 0, 0, 0, 0);

      if (year.toString().length < 4) {
        return { dateInvalid: true};
      }

      if (
        month === checkDate.getMonth() + 1 &&
        day === checkDate.getDate() &&
        year === checkDate.getFullYear()
      ) {
        return null;
      }

      return { dateInvalid: true };
    }
    return null;
  }

  /**
   * @param fieldDate
   * Form control onde será feita a validação
   * @param registredDate
   * A data que veio populada no campo
   * @description
   * Valida se a data digitada é menor do que a já registrada
   */

  static lessThanTheRegistredDate(fieldDate: string, registredDate: string) {
    const checktor = (formControl: FormControl) => {
      const field = (<FormGroup>formControl.root).get(fieldDate);

      if (field) {
        const formatedTypedDate = Validations.formatBrazilDateToJsObject(
          field.value
        ).valueOf();
        const formatedRegistredDate = Validations.formatBrazilDateToJsObject(
          registredDate
        ).valueOf();

        if (formatedTypedDate < formatedRegistredDate) {
          return { lessThanTheRegistredDate: registredDate };
        }
      }
    };
    return checktor;
  }

  /**
   * @param fieldDate
   * Form control onde será feita a validação
   * @description
   * Valida se a data inserida é maior que a data digitada naquele momento
   */

  static noFutureDate(fieldDate: string) {
    const checktor = (formControl: FormControl) => {
      const field = (<FormGroup>formControl.root).get(fieldDate);

      if (field) {
        const formatedTypedDate = Validations.formatBrazilDateToJsObject(
          field.value
        ).valueOf();
        const formatedNowDate = Date.now();

        if (formatedTypedDate > formatedNowDate) {
          return { noFutureDate: true };
        }
      }
    };
    return checktor;
  }

  /**
   * @param fieldDate
   * Form control onde será feita a validação
   * @param minAge
   * Quantidade mínima de anos a ser validada
   * @description
   * Valida se a data informada possuí a quantidade mínima de anos
   */

  static minAge(minAge: number) {
    const checktor = (formControl: FormControl) => {
      if (formControl.value) {
        return Validations.minAgeInvalid(formControl.value, minAge)
          ? { minAge: minAge }
          : null;
      }

      return null;
    };
    return checktor;
  }

  /**
   * @param min
   * Quantidade mínima de caracteres
   * @description
   * Remove os caracteres especiais e espaços do valor recebido e valida
   * se tem a quantidade mínima de caracteres
   */
  static minLengthMasked(min: number) {
    const checktor = (formControl: FormControl) => {
      const value = formControl.value;
      if (value) {
        const treatedValue = FormatTo.removeNonDigits(value);
        return treatedValue.length < min ? { minLengthMasked: min } : null;
      }

      return null;
    };
    return checktor;
  }

  static customMinLength(min: number) {
    const checktor = (formControl: FormControl) => {
      const value = formControl.value;
      if (value) {
        const treatedValue = FormatTo.removeNonDigits(value);
        return treatedValue.length < min ? { ctMinLength: min } : null;
      }

      return null;
    };
    return checktor;
  }

  /**
   * @param fieldDate
   * Form control onde será feita a validação
   * @param maxAge
   * Quantidade máxima de anos a ser validada
   * @description
   * Valida se a data informada possuí a quantidade máxima de anos
   */
  static maxAge(maxAge: number) {
    const checktor = (formControl: FormControl) => {
      if (formControl.value) {
        return Validations.maxAgeInvalid(formControl.value, maxAge)
          ? { maxAge: maxAge }
          : null;
      }

      return null;
    };
    return checktor;
  }

  /**
   * @param otherField
   * Nome do outro campo no form
   * @description
   * Valida se o campo atual e o campo informado tem os mesmos valores
   */
  static equalsTo(otherField: string) {
    const checktor = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };
    return checktor;
  }

  /**
   * @param otherField
   * Nome do outro campo no form
   * @description
   * Valida se o campo atual e o campo informado são diferentes
   */
  static differFrom(otherField: string) {
    const checktor = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }
      if (!field.value) {
        return null;
      }
      if (field.value === formControl.value) {
        return { differFrom: otherField };
      }

      return null;
    };
    return checktor;
  }

  /**
   * @param formField
   * Campo do form
   * @description
   * Valida se o valor contêm as regras mínimas de aceite de senha:
   * - 1 Letra maiúscula
   * - 1 Letra minúscula
   * - 1 Número
   * - Pelo menos 8 caracteres
   */
  static checkPassword(formField: AbstractControl) {
    const password = formField.value;
    if (password && password !== '') {
      const checkpassw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.*\W]{8,}$/;
      return checkpassw.test(password) ? null : { invalidPassword: true };
    }
    return null;
  }

  static atLeastOneValid(controls: string[], labels: string[]) {
    const checktor = (formControl: FormControl) => {
      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const fieldOne = (<FormGroup>formControl.root).get('ATLEASTONE');
      fieldOne.markAsTouched();

      const hasOne = controls.some(function (el) {
        const field = (<FormGroup>formControl.root).get(el);
        return field.value;
      });

      return hasOne ? null : { atLeastOne: labels.join(' ou ') };
    };
    return checktor;
  }

  static equals(controls: string[] = null) {
    const checktor = (group: FormGroup): ValidationErrors | null => {
      if (!controls) {
        controls = Object.keys(group.controls);
      }

      const values = [];
      controls.forEach(index => {
        if (values.indexOf(group.controls[index].value) === -1) {
          values.push(group.controls[index].value);
        }
      });

      if (values.length > 1) {
        controls.forEach(index => {
          group.controls[index].markAsTouched();
          group.controls[index].setErrors({ equalsTo: true });
        });

        return { equalsTo: true };
      }

      controls.forEach(index => {
        group.controls[index].markAsTouched();
        group.controls[index].setErrors(null);
      });

      return null;
    };

    return checktor;
  }

  static checkFullPassword(controls: string[] = null, username: string) {
    const checktor = (group: FormGroup): ValidationErrors | null => {
      if (!controls) {
        controls = Object.keys(group.controls);
      }

      const values = [];
      const usernameValue = group.controls[username].value;
      let erro: Boolean = false;

      /* required */
      controls.forEach(index => {
        if (group.controls[index].value === '') {
          group.controls[index].setErrors({ required: true });

          erro = true;
        }
      });

      /* equals */
      controls.forEach(index => {
        if (
          group.controls[index].value !== '' &&
          values.indexOf(group.controls[index].value) === -1
        ) {
          values.push(group.controls[index].value);
        }
      });

      if (values.length > 1) {
        controls.forEach(index => {
          group.controls[index].setErrors({ equalsTo: true });

          erro = true;
        });
      }

      /* Critério mínimo de aceite */
      controls.forEach(index => {
        const password = group.controls[index].value;
        if (password && password !== '') {
          const checkpassw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

          if (!checkpassw.test(password)) {
            group.controls[index].setErrors({ invalidPassword: true });

            erro = true;
          }
        }
      });

      /* Não pode conter partes do username */
      controls.forEach(index => {
        const password = group.controls[index].value;
        if (password && password !== '') {
          if (password.indexOf(usernameValue) !== -1) {
            group.controls[index].setErrors({ invalidLoginPassword: true });

            erro = true;
          }
        }
      });

      if (!erro) {
        controls.forEach(index => {
          group.controls[index].setErrors(null);
        });
      }

      return null;
    };

    return checktor;
  }

  static validaCpf(control: AbstractControl) {
    const cpf = control.value;

    return Validations.cpfIvalid(cpf) ? { validaCpf: true } : null;
  }

  static senhasCombinam(control: AbstractControl) {
    const senha = control.get('senha').value;
    const confirmarSenha = control.get('confirmarSenha').value;

    if (senha === confirmarSenha) {
      return null;
    }

    control.get('confirmarSenha').setErrors({ senhasNaoCoincidem: true });
  }

  static validaCnpj(control: AbstractControl) {
    const cnpj = control.value;
    return Validations.cnpjInvalid(cnpj) ? { validaCnpj: true } : null;
  }

  static celular(control: AbstractControl) {
    const celular = control.value;
    const regex = new RegExp('[0-9]{11}');
    if (
      celular.length === 11 ||
      celular === '00000000000' ||
      celular === '11111111111' ||
      celular === '22222222222' ||
      celular === '33333333333' ||
      celular === '44444444444' ||
      celular === '55555555555' ||
      celular === '66666666666' ||
      celular === '77777777777' ||
      celular === '88888888888' ||
      celular === '99999999999' ||
      !regex.test(celular) ||
      [7, 8, 9].indexOf(parseInt(celular.substring(2, 3), 10)) === -1
    ) {
      return { celular: true };
    }
    return null;
  }

  static telefone(control: AbstractControl) {
    const telefone = control.value;
    const regex = new RegExp('[0-9]{10}');
    if (
      telefone.length === 10 ||
      telefone === '0000000000' ||
      telefone === '1111111111' ||
      telefone === '2222222222' ||
      telefone === '3333333333' ||
      telefone === '4444444444' ||
      telefone === '5555555555' ||
      telefone === '6666666666' ||
      telefone === '7777777777' ||
      telefone === '8888888888' ||
      telefone === '9999999999' ||
      !regex.test(telefone) ||
      [2, 3, 4, 5, 6].indexOf(parseInt(telefone.substring(2, 3), 10)) === -1
    ) {
      return { telefone: true };
    }
    return null;
  }

  static hourValidator(inputValue: FormControl) {
    if (inputValue.value.length) {
      const hour = Number(inputValue.value.substr(0, 2));
      const min = Number(inputValue.value.substr(2, 4));

      if (hour <= 23 && min <= 59) {
        return null;
      }
      return { hourValidator: true };
    }
    return null;
  }

  static onlyNumbers(control: FormControl) {
    if (control.value) {
      const regex = /^[0-9]*$/;
      return regex.test(control.value) ? null : { onlyNumbers: true };
    }
    return null;
  }

  static moreThanOne(control: FormControl) {
    if (control.value && Number(control.value) > 1) {
      return null;
    }
    return { moreThanOne: true };
  }

}
