import { Signup } from './signup.model';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SignupService } from "./signup.service";


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signUpForm!: FormGroup;

    @ViewChild('usuarioInput') usuarioInput!: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private signupService: SignupService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.signUpForm = this.formBuilder.group({
            nome: [
                '',
                [Validators.required, Validators.minLength(3)]
            ],
            email: [
                '',
                [Validators.required, Validators.email, Validators.minLength(3)]
            ],
            usuario: [
                '',
                [Validators.required, Validators.minLength(3)]
            ],
            senha: [
                '',
                [Validators.required, Validators.minLength(3)]
            ]
        });

    }

    signup(): void {

        const signupUser = this.signUpForm.getRawValue() as Signup;

        signupUser.usuario = signupUser.usuario.toLowerCase().trim();

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
            return 'Campo obrigatório';
        }

        if (this.signUpForm.get(field)?.hasError('email')) {
            return 'Informe email no formato seuemail@provedor';
        }

        if (this.signUpForm.get(field)?.hasError('minlength')) {
            return `Tamanho mínimo ${this.signUpForm.get(field)?.errors?.minlength.requiredLength}`;
        }

        if (this.signUpForm.get(field)?.hasError('usuarioTaken')) {
            return 'Usuário já existente, por favor escolha outro';
        }

        return this.signUpForm.get(field)?.invalid ? `Campo não válido ${field}` : '';

    }

}