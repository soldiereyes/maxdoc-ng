import {Component, OnInit} from '@angular/core';
import {Document, DocumentService} from '../../services/document.service';
import {CommonModule} from '@angular/common';
import {DocumentDialogComponent} from '../document-dialog/document-dialog.component';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  imports: [CommonModule, DocumentDialogComponent, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, MatIconButton]
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  errorMessage: string | null = null;
  isDialogOpen = false;
  selectedDocument: Document | null = null;


  constructor(private documentService: DocumentService) {
  }

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

  openAddDialog(): void {
    this.isDialogOpen = true;
    this.selectedDocument = null;
  }

  openEditDialog(document: Document): void {
    this.isDialogOpen = true;
    this.selectedDocument = document;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  saveDocument(document: Omit<Document, 'id'>): void {
    if (this.selectedDocument) {
      this.documentService.updateDocument(this.selectedDocument.id!, document).subscribe({
        next: (updatedDocument) => {
          const index = this.documents.findIndex((doc) => doc.id === updatedDocument.id);
          if (index !== -1) {
            this.documents[index] = updatedDocument;
          }
          this.closeDialog();
        },
        error: (err) => {
          console.error('Erro ao atualizar documento:', err);
          this.errorMessage = 'Erro ao atualizar documento.';
        },
      });
    } else {
      this.documentService.addDocument(document).subscribe({
        next: (newDocument) => {
          this.documents.push(newDocument);
          this.closeDialog();
        },
        error: (err) => {
          console.error('Erro ao adicionar documento:', err);
          this.errorMessage = 'Erro ao adicionar documento.';
        },
      });
    }
  }

  createNewVersion(id?: string): void {
    if (confirm('Tem certeza de que deseja criar uma nova versão para este documento?')) {
      this.documentService.createNewVersion(id).subscribe({
        next: (newVersion) => {
          this.documents.push(newVersion);
          alert('Nova versão criada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao criar nova versão:', err);
          this.errorMessage = 'Erro ao criar nova versão.';
        },
      });
    }
  }

  updateDocumentPhase(doc: Document, newPhase: string): void {
    if (confirm(`Deseja alterar a fase do documento para: ${newPhase}?`)) {
      this.documentService.updatePhase(doc.id!, newPhase).subscribe({
        next: (updatedDocument) => {
          const index = this.documents.findIndex((d) => d.id === updatedDocument.id);
          if (index !== -1) {
            this.documents[index] = updatedDocument;
          }
          alert('Fase alterada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao alterar a fase:', err.message);
          this.errorMessage = err.message;
        },
      });
    }
  }
}
