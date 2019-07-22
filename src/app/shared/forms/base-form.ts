import { FormValidations } from './form-validations';
import { FormGroup, FormArray } from '@angular/forms';

export abstract class BaseFormComponent {

  form: FormGroup;

  constructor() { }

  abstract submit();

  onSubmit() {
    if (this.form.valid) {
      this.removeFocus();
      this.submit();
    } else {
      console.error('form inválido');
      this.checkValidacoesForm(this.form);
    }
  }

  checkValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const controle = formGroup.get(field);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.checkValidacoesForm(controle);
      }
    });
  }


  /**
   * @description
   * Remove o focus do último elmento ativo para não ficar submetendo o form toda hora
   */
  removeFocus() {
    const activeEl: any = document.activeElement;
    activeEl.blur();
  }

  resetar() {
    this.form.reset();
  }

  checkValidTouched(field: string) {
    return (
      !this.form.get(field).valid &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  checkRequired(field: string) {
    return (
      this.form.get(field).hasError('required') &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  checkEmailInvalid() {
    const fieldEmail = this.form.get('email');
    if (fieldEmail.errors) {
      return fieldEmail.errors['email'] && fieldEmail.touched;
    }
  }

  aplicaCssErro(field: string) {
    return {
      'has-error': this.checkValidTouched(field),
      'has-feedback': this.checkValidTouched(field)
    };
  }

  formErrors() {
    const errors = [];
    for ( const field in this.form.controls ) {
      if ( this.form.controls[ field].errors ) {
        const control = this.form.controls[ field ];
        for (const propertyName in control.errors) {
          if (
            control.errors.hasOwnProperty(propertyName) &&
            (control.dirty || control.touched)
            ) {
              errors.push(FormValidations.getErrorMsg( field, propertyName, control.errors[propertyName]));
            }
        }

      }

    }

    return errors;
  }

}
