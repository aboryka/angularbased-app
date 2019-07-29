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

  login(formData: NgForm): void {
    this.authService.login(formData.value.email, formData.value.password);
  }
}
