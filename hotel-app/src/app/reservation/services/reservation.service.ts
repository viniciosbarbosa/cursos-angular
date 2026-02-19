import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];
  readonly LOCAL_STORAGE_KEY = 'reservations';
  constructor() {
    let reservations = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this.reservations = reservations ? JSON.parse(reservations) : [];
  }

  getReservationById(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  getReservations(): Reservation[] {
    if (this.reservations.length > 0) {
      return this.reservations;
    } else {
      let reservations = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      this.reservations = reservations ? JSON.parse(reservations) : [];
      return this.reservations;
    }
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this.reservations),
    );
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this.reservations),
    );
  }

  updateReservation(updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(
      (res) => res.id === updatedReservation.id,
    );
    this.reservations[index] = updatedReservation;
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this.reservations),
    );
  }
}
