import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Update the path as necessary

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  inscriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log('Form Submitted'); // Add this line for debugging
    if (this.inscriptionForm.valid) {
      const { email, password } = this.inscriptionForm.value;
      this.authService.register(email, password)
        .then((user) => {
          console.log('User registered:', user);
        })
        .catch((error) => {
          console.error('Error during registration:', error);
        });
    }
  }
}
