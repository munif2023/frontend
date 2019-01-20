import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user/user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  myForm: FormGroup;
  usernumber: number;
  user$: User;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.usernumber = value.usernumber;
    });


    this.userService.getUser(this.usernumber).subscribe((value0 => {
      this.user$ = value0;
      this.myForm.patchValue(this.user$ as any);
    }));


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
    this.userService.updateUser(this.usernumber, this.myForm).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => this.router.navigate(['/myprofile']));
  }

  deleteUser() {
    this.userService.deleteUser(this.usernumber).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => {});
  }



}
