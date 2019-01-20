import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user/user.model';
import {Events} from '../event/event.model';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event/event.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comments} from '../event/comment.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event$: Events;
  eventid: number;
  userid: number;
  myForm: FormGroup;
  comments: Comments[];
  private sub: Subscription;


  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private auth: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((param: any) => {
      this.eventid = param.eventid;
    });
    this.myForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });

    this.eventService.getEvent(this.eventid).subscribe((value => {
      this.event$ = value;
    }));

    this.getComments();

    this.userid = this.auth.getUserNumber();
    console.log(this.userid);
  }
  approveEvent(eventnumber: number) {
    this.eventService.approveEvent(eventnumber).subscribe(
      approve => {
      },
      err => console.log(err),
      () => this.router.navigate(['/approvedEvents'])
    );
  }

  rejectEvent(eventnumber: number) {
    this.eventService.rejectEvent(eventnumber).subscribe(
      approve => {
      },
      err => console.log(err),
      () => this.router.navigate(['/events'])
    );
  }

  book(eventid: number) {
    this.eventService.bookEvent(this.userid, eventid).subscribe(
      book => {
      },
      err => console.log(err),
      () => this.router.navigate(['/myticket'])
    ),
      alert('Ticket Created');
  }

  getComments() {
    this.eventService.getComments(this.eventid).subscribe(
      commentList => {
        this.comments = commentList;
      },
      err => console.log(err),
      () => console.log('Comments list completed')
    );
  }

  addComment() {
    this.eventService.addComment(this.userid, this.eventid, this.myForm).subscribe(
      data => {
      },
      err => console.log(err),
      () => location.reload(),

  );
  }

  isApprove() {
    if (this.event$.approved === true) {
      return true;
    }
  }

  isAdmin() {
    if (this.auth.getRole() === 'ROLE_ADMIN') {
      return true;
    }
  }
  isOrg() {
    if (this.auth.getRole() === 'ROLE_ORGANIZER') {
      return true;
    }
  }
  isUser() {
    if (this.auth.getRole() === 'ROLE_USER') {
      return true;
    }
  }
  bookedTickets() {
    if (this.event$.count < this.event$.seatnum) {
      return true;
    }
  }

}
