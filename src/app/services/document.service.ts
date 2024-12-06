import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environments';

export interface Document {
  id? : string | undefined;
  title: string;
  description: string;
  sigla: string;
  version: number;
  phase: string;
}

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }

  deleteDocument(id?: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addDocument(document: Omit<Document, 'id'>): Observable<Document> {
    return this.http.post<Document>(this.apiUrl, document);
  }

  updateDocument(id: string, document: Omit<Document, 'id'>): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${id}`, document);
  }

  createNewVersion(id?: string): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/${id}/new-version`, {});
  }

  updatePhase(id: string, phase: string): Observable<Document> {
    return this.http.patch<Document>(`${this.apiUrl}/${id}/phase?phase=${phase}`, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro ao alterar a fase.';
        if (error.status === 400 || error.status === 409) {
          errorMessage = error.error.message || 'Transição de fase inválida.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
