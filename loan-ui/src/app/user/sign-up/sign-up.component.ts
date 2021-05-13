import { Component, OnInit } from '@angular/core';
import{ NgForm } from '@angular/forms';
import{ UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  showSuccessMessage: boolean;
  serverErrorMessages: String;

  constructor(public userService : UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
   this.userService.postUser(form.value).subscribe(
     res => {
       this.showSuccessMessage = true;
       setTimeout(() => this.showSuccessMessage = false, 4000);
       this.resetForm(form);
     },
     err => {
       if (err.status === 422){
         this.serverErrorMessages = err.error.join('<br/>');
       }
       else
       this.serverErrorMessages = 'Something went wrong. Please contact admin.';
     }
   );

  }

  resetForm(form: NgForm){
    this.userService.selectedUser = {
      first_name:'',
      last_name:'',
      email:'',
      mobile:'',
      password:''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
