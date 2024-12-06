import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-document-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.css'],
})
export class DocumentDialogComponent {
  @Input() documentData: any | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  documentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      sigla: ['', [Validators.required, Validators.maxLength(10)]],
      version: [1, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.documentData) {
      this.documentForm.patchValue(this.documentData);
    }
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      this.save.emit(this.documentForm.value);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
