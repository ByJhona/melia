import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../types/ResponseInterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  sendText(text: string): Observable<ResponseInterface> {
    const formData = new FormData();
    formData.append('email', text);
    return this.http.post<ResponseInterface>(
      `${this.baseUrl}/api/submit-text`,
      formData
    );
  }

  sendFile(file: File): Observable<ResponseInterface> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ResponseInterface>(
      `${this.baseUrl}/api/submit-file`,
      formData
    );
  }
}
