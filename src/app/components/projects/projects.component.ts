import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf, DatePipe, AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgIf, NgForOf, DatePipe, AsyncPipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;
  activeFilter: string = 'all';

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
        this.projects = data;
        this.filteredProjects = this.projects;
      },
      error: (error: Error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  filterProjects(category: string) {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
  }

  openProjectDetails(project: Project) {
    this.selectedProject = project;
  }

  closeProjectDetails() {
    this.selectedProject = null;
  }

  deleteProject(project: Project, event: Event) {
    event.stopPropagation(); // Verhindert das Öffnen des Modals
    
    if (!confirm('Möchten Sie dieses Projekt wirklich löschen?')) {
      return;
    }

    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p.id !== project.id);
        this.filteredProjects = this.filteredProjects.filter(p => p.id !== project.id);
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
