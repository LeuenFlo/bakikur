import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export interface ProjectImage {
  id: number;
  imageUrl: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'moebel' | 'innenausbau' | 'restaurierung';
  images: ProjectImage[];
  completionDate: string;
}

export interface CreateProjectDTO {
  title: string;
  description: string;
  category: string;
  completionDate: string;
  images: File[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`;
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      map(projects => projects.map(project => ({
        ...project,
        images: project.images.map(img => ({
          ...img,
          imageUrl: this.getFullImageUrl(img.imageUrl)
        }))
      })))
    );
  }

  createProject(project: CreateProjectDTO): Observable<Project> {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('category', project.category);
    formData.append('completionDate', project.completionDate);
    project.images.forEach((image, index) => {
      formData.append('images', image);
    });

    return this.http.post<Project>(this.apiUrl, formData).pipe(
      tap(() => {
        this.router.navigate(['/projects']);
      })
    );
  }

  deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${projectId}`);
  }

  private getFullImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
    return `${this.baseUrl}/${cleanImageUrl}`;
  }
} 