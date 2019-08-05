import { NgModule } from "@angular/core";
import { SignInComponent, SignUpComponent, AuthComponent } from './index';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class AuthModule {

}
