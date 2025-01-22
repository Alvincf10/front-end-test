import { Component } from '@angular/core';
import { AuthServiceService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthServiceService, private router: Router) {}

  login () {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response)
        localStorage.setItem('token', response.access_token);
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
