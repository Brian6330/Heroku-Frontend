import {Component, OnInit} from '@angular/core';
import {User} from '../../_models';
import {AdminService} from '../../_services';
import {Location} from '@angular/common';

@Component({
    selector: 'app-users-panel',
    templateUrl: './users-panel.component.html',
    styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

    users: User[];

    constructor(
        private adminService: AdminService,
        private location: Location
    ) {
    }

    ngOnInit() {
        this.users = [];
        this.loadAllUsers()
    }

    goBack(): void {
        this.location.back();
    }

    private loadAllUsers() {
        this.adminService.getAllUsers().subscribe(users => {
            this.users = users;
        });
    }
}
