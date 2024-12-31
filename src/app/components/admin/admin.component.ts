import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private apiUrl = 'http://localhost:5040/api/projects';
  
  newProject = {
    title: '',
    description: '',
    category: '',
    completionDate: '',
    image: null as File | null
  };

  imagePreview: string | null = null;
  isSubmitting = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.newProject.image = file;
      
      // Erstelle Bildvorschau
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.newProject.image) {
      alert('Bitte wählen Sie ein Bild aus');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('title', this.newProject.title);
    formData.append('description', this.newProject.description);
    formData.append('category', this.newProject.category);
    formData.append('completionDate', this.newProject.completionDate);
    formData.append('image', this.newProject.image);

    this.http.post(this.apiUrl, formData).subscribe({
      next: (response) => {
        alert('Projekt erfolgreich hinzugefügt');
        // Formular zurücksetzen
        this.newProject = {
          title: '',
          description: '',
          category: '',
          completionDate: '',
          image: null
        };
        this.imagePreview = null;
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Fehler beim Hinzufügen des Projekts:', error);
        alert('Fehler beim Hinzufügen des Projekts');
        this.isSubmitting = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
} 