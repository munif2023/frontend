import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';
import {EditComponent} from './edit/edit.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './authentication/auth.guard';
import {EventComponent} from './event/event.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {CreateEventComponent} from './create-event/create-event.component';
import {MyEventComponent} from './my-event/my-event.component';
import {EditEventComponent} from './edit-event/edit-event.component';
import {EventApprovedComponent} from './event-approved/event-approved.component';
import {MyTicketComponent} from './my-ticket/my-ticket.component';
import {EventTicketComponent} from './event-ticket/event-ticket.component';
import {EventNotapproveComponent} from './event-notapprove/event-notapprove.component';
import {MyProfileComponent} from './my-profile/my-profile.component';


const routes: Routes = [
  {path: '', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'home', component: AppComponent},
  {path: 'users', component: UserComponent},
  {path: 'user/:usernumber', component: EditComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'events', component: EventComponent},
  {path: 'event/:eventid', component: EventDetailComponent},
  {path: 'notApprovedEvents', component: EventNotapproveComponent},
  {path: 'createEvent', component: CreateEventComponent},
  {path: 'myevent', component: MyEventComponent, canActivate: [AuthGuard], data: { userRole : ['ROLE_ORGANIZER']}},
  {path: 'editEvent/:eventnumber', component: EditEventComponent},
  {path: 'eventTicket/:eventnumber', component: EventTicketComponent},
  {path: 'approvedEvents', component: EventApprovedComponent},
  {path: 'myticket', component: MyTicketComponent},
  {path: 'myprofile', component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
