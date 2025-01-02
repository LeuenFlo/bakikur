import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProjectService, CreateProjectDTO } from '../../services/project.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  newProject: CreateProjectDTO = {
    title: '',
    description: '',
    category: '',
    completionDate: '',
    image: null as unknown as File
  };

  imagePreview: string | null = null;
  isSubmitting = false;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
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
    this.projectService.createProject(this.newProject).subscribe({
      next: () => {
        alert('Projekt erfolgreich hinzugefügt');
        this.router.navigate(['/projekte']);
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

  cancel() {
    this.router.navigate(['/projekte']);
  }
} 