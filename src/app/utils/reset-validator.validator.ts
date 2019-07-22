import { AbstractControl } from '@angular/forms';

export class ResetValidator {
  public static reconfirmPassword(control: AbstractControl) {
    const parent = control.parent;

    if (parent && control.value) {
      if (parent.get('PASSWORD').value !== control.value) {
        return { reset: true };
      } else {
        return null;
      }
    }

    return null;
  }
}
