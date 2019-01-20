import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../user/user.model';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  user$: Observable<User>;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstname: ['', Validators.required],
      secondname: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z]/)])],
      userphone: ``,
      role:  ``
    });
  }

  onSubmit() {
    this.userService.addUser(this.myForm).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {console.log('user added'); });
  }

}
