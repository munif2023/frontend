import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User} from '../user/user.model';
import {Events} from '../event/event.model';
import {EventService} from '../event/event.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  myForm: FormGroup;
  event$: Observable<Events>;
  orgnaizerid: number;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      eventname: ['', Validators.required],
      city: ['', Validators.required],
      dateday: ['', Validators.required],
      seatnum: ['', Validators.compose([Validators.required, Validators.max(3)])]
    });
    this.orgnaizerid = this.auth.getUserNumber();
  }
  onSubmit() {
    this.eventService.addEvent(this.orgnaizerid, this.myForm).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => {
      alert('Event Added');
    });
  }
}
