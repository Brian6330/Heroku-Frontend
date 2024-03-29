import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AlertService, UserService} from '../_services';
import {sha256} from 'js-sha256';


/**
 * The login component uses the authentication service to login to the application. If the user is already logged in
 * they are automatically redirected to the home page.
 *
 * The userEditForm: FormGroup object defines the form controls and validators, and is used to access data entered
 * into the form. The FormGroup is part of the Angular Reactive Forms module and is bound to the login template
 * above with the [formGroup]="userEditForm" directive.
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.userService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        // get return url from route parameters or default to '/home'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

    // helper method
    private getElementById(id: string) {
        return (<HTMLInputElement>document.getElementById(id));
    }

    onSubmit() {
        this.submitted = true;

        if (this.invalidForm()) return;

        this.loading = true;

        let user = {
            'username': (<HTMLInputElement>document.getElementById('username')).value,
            'password': sha256((<HTMLInputElement>document.getElementById('password')).value)
        };

        this.userService.login(user)
            .subscribe(
                (user: any) => {
                    this.userService.save(user);
                    this.alertService.success('Successfully logged in.', true);
                    this.router.navigate([this.returnUrl])
                        .then(() => this.router.navigate([this.returnUrl]));
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private invalidForm(): boolean {
        return this.invalidUsername() || this.invalidPassword();
    }


    invalidUsername(): boolean {
        return this.getElementById('username').value.length === 0;
    }

    invalidPassword(): boolean {
        return this.getElementById('password').value.length === 0;
    }
}