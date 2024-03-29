import {Component, OnInit} from '@angular/core';
import {AdminService, UserService} from '../_services';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    loggedIn: string;
    isAdmin: boolean;

    constructor(
        private adminService: AdminService,
        private userService: UserService,
        private router: Router,
    ) {
        this.userService.currentUser.subscribe(x => this.loggedIn = x);
    }

    ngOnInit() {
        const header = document.getElementById('topnav');
        const btns = header.getElementsByClassName('w3-button');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function () {
                var current = document.getElementsByClassName('active');
                current[0].className = current[0].className.replace(' active', '');
                this.className += ' active';
            });
        }
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/home']);
    }
}
