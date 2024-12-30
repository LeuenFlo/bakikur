import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'moebel' | 'innenausbau' | 'restaurierung';
  imageUrl: string;
  completionDate: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgIf, NgForOf, DatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private apiUrl = 'http://localhost:5040/api/projects';
  private baseUrl = 'http://localhost:5040';
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;
  activeFilter: string = 'all';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.http.get<Project[]>(this.apiUrl).subscribe({
      next: (data: Project[]) => {
        this.projects = data.map(project => ({
          ...project,
          imageUrl: this.getFullImageUrl(project.imageUrl)
        }));
        this.filteredProjects = this.projects;
      },
      error: (error: Error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  private getFullImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
    return `${this.baseUrl}/${cleanImageUrl}`;
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
}
