import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];  // Az időpontokat tároló tömb
  selectedAppointment: any = null;  // A kiválasztott időpont
  appointmentDates: any = {};  // A kiválasztott időpontok adatainak tárolása
  hours: number[] = [];  // Órák
  minutes: number[] = [];  // Percek

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAppointments();
    this.initTimeOptions();  // Órák és percek inicializálása
  }

  // Időpontok lekérése
  getAppointments(): void {
    this.appointmentService.getAppointments().subscribe(
      (response) => {
        this.appointments = response.data;  // A válasz 'data' kulcsában lévő adatokat használjuk
      },
      (error) => {
        console.error('Hiba történt az időpontok lekérésekor:', error);
      }
    );
  }

  // Időpont kiválasztása
  selectAppointment(appointment: any): void {
    this.selectedAppointment = { ...appointment };  // Készítünk egy másolatot a szerkesztéshez
    this.appointmentDates[appointment.animal_name] = {
      date: appointment.appointment_time.split(' ')[0],  // A dátum rész
      hour: appointment.appointment_time.split(' ')[1].split(':')[0],  // Az óra
      minute: appointment.appointment_time.split(' ')[1].split(':')[1],  // A perc
    };
  }

  // Időpontok órák és percek inicializálása
  initTimeOptions(): void {
    this.hours = Array.from({ length: 12 }, (_, i) => i + 8);  // 8-19 óráig
    this.minutes = [0, 30];  // Félórás időpontok
  }

  // Időpont módosítása
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

    if (hour >= 8 && hour < 19 && (minute === 0 || minute === 30) && day >= 1 && day <= 5) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const appointmentTime = `${appointment.date} ${formattedHour}:${formattedMinute}`;

      const updatedAppointment = {
        name: this.selectedAppointment.animal_name,
        appointment_time: appointmentTime
      };

      // Hívás a service-ben található updateAppointment metódusra
      this.appointmentService.updateAppointment(this.selectedAppointment.id, updatedAppointment).subscribe(
        (response) => {
          alert(response.message);  // Sikeres frissítés
          this.getAppointments();  // Frissíteni az időpontok listáját
        },
        (error) => {
          console.error('Hiba történt az időpont frissítésekor:', error);
        }
      );
    } else {
      alert('A kiválasztott időpont érvénytelen!');
    }
  }

  // Időpont törlése
  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(
      (response) => {
        alert('Az időpont sikeresen törölve!');
        this.getAppointments();  // Frissítjük az időpontok listáját
      },
      (error) => {
        console.error('Hiba történt az időpont törlésekor:', error);
      }
    );
  }
}
