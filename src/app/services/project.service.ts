import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'moebel' | 'innenausbau' | 'restaurierung';
  imageUrl: string;
  completionDate: string;
}

export interface CreateProjectDTO {
  title: string;
  description: string;
  category: string;
  completionDate: string;
  image: File;
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
        imageUrl: this.getFullImageUrl(project.imageUrl)
      })))
    );
  }

  createProject(project: CreateProjectDTO): Observable<Project> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );

    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('category', project.category);
    formData.append('completionDate', project.completionDate);
    formData.append('image', project.image);

    return this.http.post<Project>(this.apiUrl, formData, { headers }).pipe(
      tap(() => {
        this.router.navigate(['/projects']);
      })
    );
  }

  deleteProject(projectId: number): Observable<void> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );

    return this.http.delete<void>(`${this.apiUrl}/${projectId}`, { headers });
  }

  private getFullImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
    return `${this.baseUrl}/${cleanImageUrl}`;
  }
} 