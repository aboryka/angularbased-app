import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(public authService: AuthService) { }

  wrongPasswd: boolean;
  check(formDate: NgForm) {
    console.log(formDate)
  }
  login(formData: NgForm){
    this.authService.login(formData.value.email, formData.value.password);
  }
}
