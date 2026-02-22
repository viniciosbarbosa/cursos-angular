import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  standalone: false,
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss',
})
export class ReservationListComponent {
  reservations: Reservation[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService,
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((response) => {
      this.reservations = response;
    });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
    this.reservationService.getReservations().subscribe((response) => {
      this.reservations = response;
    });
  }

  addNewReservation() {
    this.router.navigate(['/reservation/form']);
  }

  updateReservation(id: string) {
    this.router.navigate(['/reservation/edit', id]);
  }
}
