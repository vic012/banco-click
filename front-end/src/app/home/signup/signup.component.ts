import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ValidParentMatcher } from "./custom-validators";
import { PasswordEqual } from './password-equal.validator';
import { Signup } from './signup.model';
import { SignupService } from "./signup.service";


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signUpForm!: FormGroup;

    validParentMatcher = new ValidParentMatcher();

    @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private signupService: SignupService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            name: [
                '',
                [Validators.required, Validators.minLength(3)]
            ],
            email: [
                '',
                [Validators.required, Validators.email, Validators.minLength(3)]
            ],
            username: [
                '',
                [Validators.required, Validators.minLength(3)]
            ],
            password: [
                '',
                [Validators.required, Validators.minLength(3)]
            ],
            passwordConfirmation: [
                '',
                [Validators.required]                
            ]
        }, {
            validators: [PasswordEqual.validate]
        });

    }

    signup(): void {

        const signupUser = this.signUpForm.getRawValue() as Signup;

        signupUser.username = signupUser.username.toLowerCase().trim();

        this.signupService
            .createUser(signupUser)
            .subscribe(
                () => {
                    this.router.navigate(['']);
                },
                (error) => {
                    this.signUpForm.reset();
                    alert('Alguma coisa errada aconteceu');
                }

            );

    }

    getErrorMessage(field: string): string {
        if (this.signUpForm.get(field)?.hasError('required')) {
            return 'Campo obrigat??rio';
        }

        if (this.signUpForm.get(field)?.hasError('email')) {
            return 'Informe email no formato seuemail@provedor';
        }

        if (this.signUpForm.get(field)?.hasError('minlength')) {
            return `Tamanho m??nimo ${this.signUpForm.get(field)?.errors?.minlength.requiredLength}`;
        }

        if (this.signUpForm.get(field)?.hasError('usernameTaken')) {
            return 'Usu??rio j?? existente, por favor escolha outro';
        }

        return this.signUpForm.get(field)?.invalid ? `Campo n??o v??lido ${field}` : '';

    }

}