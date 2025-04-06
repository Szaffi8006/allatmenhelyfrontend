import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin.appointments',
  templateUrl: './admin.appointments.component.html',
  styleUrls: ['./admin.appointments.component.css']
})
export class AdminAppointmentsComponent implements OnInit {

  appointments: any[] = [];
  message: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.adminService.getAnyAppointments().subscribe({
      next: (res) => {
        this.appointments = res.data;
      },
      error: (err) => {
        console.error('Hiba történt:', err);
      }
    });
  }
  
  deleteAppointment(id: number): void {
    if (confirm('Biztosan törölni szeretnéd ezt az időpontot?')) {
      this.adminService.deleteAppointment(id).subscribe({
        next: () => {
          this.message = 'Időpont sikeresen törölve!';
          this.loadAppointments();

          setTimeout(() => {
            this.message = '';
          }, 3000); // üzenet eltűnik 3 mp után
        },
        error: (err) => {
          console.error('Hiba a törlés során:', err);
        }
      });
    }
  }
  
}