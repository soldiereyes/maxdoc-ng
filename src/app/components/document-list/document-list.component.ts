import { Component, OnInit } from '@angular/core';
import {Document, DocumentService} from '../../services/document.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  imports: [CommonModule]
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  errorMessage: string | null = null;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (data: any): void => {
        this.documents = data;
      },
      error: (err: any): void => {
        this.errorMessage = 'Erro ao carregar documentos.';
        console.error(err);
      },
    });
  }

  deleteDocument(id?: string): void {
    if (confirm('Tem certeza de que deseja excluir este documento?')) {
      this.documentService.deleteDocument(id).subscribe({
        next: () => {
          this.documents = this.documents.filter((doc) => doc.id !== id);
        },
        error: (err) => {
          console.error('Erro ao excluir o documento:', err);
          this.errorMessage = 'Erro ao excluir o documento.';
        },
      });
    }
  }
}
