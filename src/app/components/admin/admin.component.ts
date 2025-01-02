import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProjectService, CreateProjectDTO } from '../../services/project.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  newProject: CreateProjectDTO = {
    title: '',
    description: '',
    category: '',
    completionDate: '',
    images: []
  };

  imagePreviews: { file: File; preview: string }[] = [];
  isSubmitting = false;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        if (file instanceof File && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePreviews.push({
              file: file,
              preview: reader.result as string
            });
            this.updateProjectImages();
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.imagePreviews, event.previousIndex, event.currentIndex);
    this.updateProjectImages();
  }

  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.updateProjectImages();
  }

  private updateProjectImages() {
    this.newProject.images = this.imagePreviews.map(item => item.file);
  }

  onSubmit() {
    if (this.newProject.images.length === 0) {
      alert('Bitte wählen Sie mindestens ein Bild aus');
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