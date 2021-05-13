import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent {
  public href: string = "";
  constructor(private router: Router, private service: UserService) { }
  userDetails: any = {
    fullName: "Loading...absent"
  }
  ngOnInit() {
    this.href = window.location.pathname;
    //console.log(window.location.pathname);

    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
        //console.log(this.userDetails);
      },
      err => {
        console.log(err);
      }
    )
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
