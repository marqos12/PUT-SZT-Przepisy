import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ContactMessageService } from 'src/app/services/contact-message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  newContactMessageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactMessageService: ContactMessageService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.newContactMessageForm = this.formBuilder.group({
      author: ['', Validators.required],
      email: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  add() {
    if (this.newContactMessageForm.valid) {
      const message = this.newContactMessageForm.value;
      this.contactMessageService.addMessage(message).subscribe(this.afterAdd.bind(this));
    } else {
      this.markAllControlsAsTouched();
    }
  }

  markAllControlsAsTouched() {
    for (const field in this.newContactMessageForm.controls) {
      this.newContactMessageForm.controls[field].markAsDirty();
    }
  }

  afterAdd(message) {
    this.initForm();
    this.messageService.add({ severity: 'success', summary: "Wysłano wiadomość!" })
  }

}
