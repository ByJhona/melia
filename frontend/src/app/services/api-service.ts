import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TextAnalysisResponseInterface } from '../types/TextAnalysisResponseInterface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  sendText(text: string): Observable<TextAnalysisResponseInterface> {
    const formData = new FormData();
    formData.append('email', text);
    return this.http.post<TextAnalysisResponseInterface>(
      `${this.baseUrl}/api/submit-text`,
      formData
    );
  }

  sendFile(file: File): Observable<TextAnalysisResponseInterface> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<TextAnalysisResponseInterface>(
      `${this.baseUrl}/api/submit-file`,
      formData
    );
  }
}
