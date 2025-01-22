import { Component } from '@angular/core';
import { AuthServiceService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username = '';
  name = '';
  password = '';
  constructor(private authService: AuthServiceService, private router: Router) {}
  register () {
    this.authService.register(this.username, this.name, this.password).subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', response.user.id);
        alert('Login successful');
        this.router.navigate((['backoffice/dashboard']));
      },
      (error) => {
        console.log(error)
        alert(error.message)
      }
    )
  }
}
