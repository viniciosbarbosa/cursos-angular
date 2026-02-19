import { ReservationService } from './../services/reservation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  minDate: string = new Date().toISOString().split('T')[0];
  id: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id) {
      let reservation = this.reservationService.getReservationById(this.id);

      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  createForm() {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      roomNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation = {
        id: this.id || Date.now().toString(),
        checkInDate: this.reservationForm.value.checkInDate,
        checkOutDate: this.reservationForm.value.checkOutDate,
        guestName: this.reservationForm.value.guestName,
        guestEmail: this.reservationForm.value.guestEmail,
        roomNumber: this.reservationForm.value.roomNumber,
      };

      if (this.id) {
        this.reservationService.updateReservation(reservation);
      } else {
        this.reservationService.addReservation(reservation);
      }

      this.reservationForm.reset();
      this.router.navigate(['/reservation/list']);
    }
  }
}
