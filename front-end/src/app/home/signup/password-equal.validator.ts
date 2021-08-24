import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordEqual {

    static validate(abstractControl: AbstractControl): ValidationErrors | null {

        const password = abstractControl.get('password')?.value;
        const passwordConfirmation = abstractControl.get('passwordConfirmation')?.value;

        if (password?.trim() + passwordConfirmation?.trim()) {
            return password == passwordConfirmation ? null : { passwordEqual: true };
        } else {
            return null;
        }

    }
}
