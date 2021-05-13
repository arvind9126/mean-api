import { Component, OnInit } from '@angular/core';
import{ NgForm } from '@angular/forms';
import{ UserService } from '../../shared/user.service';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  serverErrorMessages: String;

  constructor(private userService : UserService, private router: Router) { }


  model = {
    email:'',
    password:''
  };

  ngOnInit(){
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/user-profile')
  }

  onSubmit(form: NgForm){
   this.userService.login(form.value).subscribe(
    res => {
     this.userService.setToken(res['token']);
     this.router.navigateByUrl('/user-profile');
    },
    err => {
      this.serverErrorMessages = err.error.message;
    }
   );
  }

}
