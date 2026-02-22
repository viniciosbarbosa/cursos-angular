import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly api = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.api}/reservations`);
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.api}/reservation/${id}`);
  }

  addReservation(reservation: Reservation): void {
    this.http.post<Reservation>(`${this.api}/reservation`, reservation);
  }

  deleteReservation(id: string): void {
    this.http.delete<Reservation>(`${this.api}/reservation/${id}`);
  }

  updateReservation(updatedReservation: Reservation): void {
    this.http.put<Reservation>(
      `${this.api}/reservation/${updatedReservation.id}`,
      updatedReservation,
    );
  }
}
