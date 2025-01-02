import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProjectService, Project } from '../../services/project.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgIf, NgForOf, AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;
  activeFilter: string = 'all';
  currentImageIndex: number = 0;

  constructor(
    private projectService: ProjectService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data.sort((a, b) => {
          return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
        });
        this.applyFilter();
      },
      error: (error: Error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  filterProjects(category: string) {
    this.activeFilter = category;
    this.applyFilter();
  }

  private applyFilter() {
    if (this.activeFilter === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === this.activeFilter);
    }
  }

  formatDate(date: string): string {
    try {
      return formatDate(date, 'MMMM yyyy', 'de-CH');
    } catch (error) {
      console.error('Error formatting date:', error);
      return date;
    }
  }

  truncateText(text: string, maxLength: number = 100): { text: string, isTruncated: boolean } {
    if (text.length <= maxLength) {
      return { text, isTruncated: false };
    }
    return { 
      text: text.substring(0, maxLength) + '...',
      isTruncated: true 
    };
  }

  openProjectDetails(project: Project) {
    this.selectedProject = project;
    this.currentImageIndex = 0;
  }

  closeProjectDetails() {
    this.selectedProject = null;
    this.currentImageIndex = 0;
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage() {
    if (this.selectedProject && this.currentImageIndex < this.selectedProject.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  setCurrentImage(index: number) {
    this.currentImageIndex = index;
  }

  deleteProject(project: Project, event: Event) {
    event.stopPropagation();
    
    if (!confirm('Möchten Sie dieses Projekt wirklich löschen?')) {
      return;
    }

    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p.id !== project.id);
        this.applyFilter();
        if (this.selectedProject?.id === project.id) {
          this.selectedProject = null;
        }
      },
      error: (error) => {
        console.error('Error deleting project:', error);
        alert('Fehler beim Löschen des Projekts');
      }
    });
  }
}
