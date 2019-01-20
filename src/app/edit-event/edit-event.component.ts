import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Events} from '../event/event.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  myForm: FormGroup;
  eventnumber: number;
  event$: Events;

  constructor(private formBuilder: FormBuilder, private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((value: any) => {
      this.eventnumber = value.eventnumber;
    });

    this.eventService.getEvent(this.eventnumber).subscribe((value0 => {
      this.event$ = value0;
      this.myForm.patchValue(this.event$ as any);
    }));

    this.myForm = this.formBuilder.group({
      eventname: ['', Validators.required],
      city: ['', Validators.required],
      dateday: ['', Validators.required],
      seatnum: ['', Validators.compose([Validators.required, Validators.max(3)])]
    });
  }

  onSubmit() {
    this.eventService.updateEvent(this.eventnumber, this.myForm).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error), () => this.router.navigate(['/myevent']));
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.eventnumber).subscribe(res => {
      if (res !== null && res !== undefined) {
        console.log(res);
      }
    }, (error) => console.log(error),
      () => { this.router.navigate(['/myevent']);
      });
  }

}
