import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActionFormComponent } from './action-form/action-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tasks: any;
  constructor(
    private router: Router,
    private taskService: TaskService,
    private dialog: MatDialog
    ){}

  ngOnInit() {
    this.getAllData();
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);

    alert('You Have been log out successfully')
  }

  getAllData = () => {
    const param = {
    }
    this.taskService.getAll(param).subscribe(
      (resp) => {
        this.tasks = resp
      }
     )
  }

  action = (taskData = null) => {
    const dialogRef = this.dialog.open(ActionFormComponent, {
      width : '500px',
      maxHeight: '100vh',
      data : taskData
    });
    dialogRef.afterClosed().subscribe(
      (result: any) => {
        if (result){
          this.getAllData();
        }
      }
    );
  }

  deleteData = (id: number) => {
    this.taskService.Delete(id).subscribe(
      data => {
          console.log(data)
          this.getAllData();
      }, () => {
        console.log('gagal menghapus data')
      }
    );
  }

  toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  toggleProfile() {
    const profile = document.getElementById('profile');
    if (profile) {
      profile.classList.toggle('hidden');
    }
  }

}
