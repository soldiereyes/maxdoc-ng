import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
