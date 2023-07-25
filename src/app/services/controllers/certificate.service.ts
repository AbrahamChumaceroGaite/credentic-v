import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  apiUrl: string = environment.api + "/certificado";
  constructor(private httpClient: HttpClient) {
   }

  getByCertificate(id: any) : Observable <any[]>{
    return this.httpClient.get<any[]>(this.apiUrl + '/massive/getById/' + id);
  }
  
  isDelivery(id: any, body:any) {
    return this.httpClient.put(this.apiUrl + '/check/' + id, body);
  }

  isCheck(id: any, body:any) {
    return this.httpClient.put(this.apiUrl + '/qr/' + id, body);
  }

}
