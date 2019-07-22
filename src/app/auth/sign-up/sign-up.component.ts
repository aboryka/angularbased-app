import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent {
  constructor(private authService: AuthService) {}

  password: string = null;
  confirmPassword: string = null;

  matchPasswd(): boolean {
    return this.password === this.confirmPassword ? true : false;
  }

  signUp(formData: NgForm) {
    if (this.matchPasswd()) {
      this.authService.signup(formData.value.email, formData.value.password);
    }
    console.log(this.matchPasswd())
  }
}
