import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateOTP } from '../shared/validators/login.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  displayOTP = false;
  counter = 0;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      OTP: ['', [Validators.required, ValidateOTP]]
    })
  }
  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.counter++;
    if (this.counter >= 3) {
      this.displayOTP = false
      this.f['mobile'].setValue('');
      this.f['OTP'].setValue('');
      this.counter = 0
      this.form.updateValueAndValidity()
    }
    if (this.form.valid) {
      this.router.navigate(['/reserve'])
    }
  }
  sendOTP() {
    this.displayOTP = true;
    this.counter = 0
  }
}
