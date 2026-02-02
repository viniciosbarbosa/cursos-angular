import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  standalone: false,
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];

  ngOnInit(): void {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      this.appointments = JSON.parse(storedAppointments);
    }
  }

  addNewAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment: Appointment = {
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate,
        id: Date.now(),
      };
      this.appointments.push(newAppointment);
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();

      localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }
  }

  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
  }
}
