import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointments: any[] = [];
  appointmentDates: any = {};
  errorMessage: string = '';
  selectedAppointment: any = null;
  hours: number[] = [];
  minutes: number[] = [0, 30];
  holidays: string[] = ["2025-01-01", "2025-03-15", "2025-04-21", "2025-05-01", "2025-08-20", "2025-10-23", "2025-12-25", "2025-12-26"];

  constructor(
    private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.getAppointments();
    this.hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8-tól 20-ig órák
  }

  // Időpontok lekérése
  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (response) => {
        this.appointments = response.data;
      },
      (error) => {
        console.error('Hiba történt az időpontok lekérésekor:', error);
      }
    );
  }

  // Időpont törlése
  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(
      () => {
        this.appointments = this.appointments.filter(a => a.id !== appointmentId);
      },
      (error: any) => {
        this.errorMessage = 'Hiba történt az időpont törlésekor: ' + error.message;
      }
    );
  }

  // Időpont kiválasztása
  selectAppointment(appointment: any): void {
    this.selectedAppointment = { ...appointment };  // Készítünk egy másolatot a szerkesztéshez
  }

  updateAppointment(): void {
    const appointment = this.appointmentDates[this.selectedAppointment.animal_name];
  
    if (!appointment.date) {
      alert('Kérlek adj meg dátumot!');
      return;
    }
  
    const hour = Number(appointment.hour);
    const minute = Number(appointment.minute);
  
    const appointmentDate = new Date(appointment.date);
    const day = appointmentDate.getDay();
  
    if (hour >= 8 && hour < 20 && (minute === 0 || minute === 30) && day >= 1 && day <= 5) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const appointmentTime = `${appointment.date} ${formattedHour}:${formattedMinute}`;
  
      const updatedAppointment = {
        id: this.selectedAppointment.id,
        animal_name: this.selectedAppointment.animal_name,
        appointment_time: appointmentTime
      };
  
      this.appointmentService.updateAppointment(updatedAppointment).subscribe(
        (response) => {
          alert(response.message); // Sikeres frissítés
          this.getAppointments(); // Frissíteni az időpontok listáját
        },
        (error) => {
          console.error('Hiba történt az időpont frissítésekor:', error);
        }
      );
    } else {
      alert('A kiválasztott időpont érvénytelen!');
    }
  }
}
