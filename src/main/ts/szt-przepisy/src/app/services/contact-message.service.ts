import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { ContactMessageDto } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {

  constructor(private restService: RestService) { }

  public addMessage(contactMessage: ContactMessageDto): Observable<ContactMessageDto> {
    return this.restService.post("/api/contactMessage", contactMessage);
  }
}
