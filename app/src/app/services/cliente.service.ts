import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  ApiUrl='http://localhost:5000/api/cliente';    
  constructor(private httpclient: HttpClient) { }    
    
  obterClientes():Observable<Cliente[]>{    
    return this.httpclient.get<Cliente[]>(this.ApiUrl + '/'); 

  }

  salvarCliente(item:Cliente):Observable<Cliente>{ 
    return this.httpclient.post<Cliente>(this.ApiUrl+ '/', item);    
  }

  removerCliente(id : number): Observable<Cliente>{
    return this.httpclient.delete<Cliente>(this.ApiUrl + '/' + id);
  }
}
