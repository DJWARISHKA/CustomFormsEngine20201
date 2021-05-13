import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService,private route:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit()
  {
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded)
        {
          this.route.navigateByUrl('/login');
          this.toastr.success('New user created!','Registration successful.');
        }else{
          res.errors.forEach(element => {
            switch(element.code)
            {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken!','Registration failed.');
                break;
                default:
                  this.toastr.error(element.description,'Registration failed.');
                  break; 
            }
          })
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
