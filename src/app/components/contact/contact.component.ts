import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  onSubmit() {
    console.log('Formular gesendet:', this.contact);
    this.submitted = true;
    // Hier später die tatsächliche Formularverarbeitung implementieren
  }
}
