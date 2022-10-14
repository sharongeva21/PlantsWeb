import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoutingService {


  public baseUrl = 'https://localhost:44375/api/plants/';

  constructor(private router:Router, private http:HttpClient) { }
  
  public navigate(path:string, params?:any){
    if(params){ //navigate with params to pass to reciving component
      this.router.navigate(['/' + path, params]);
    }else{
      this.router.navigate(['/'+ path]);
    }
    
  }

  //get all useres
  public get (path:string): Observable<any> {
    return this.http.get(this.baseUrl + path);
  }
  
  public post(path:string, body:any): Observable<any> {
    return this.http.post(this.baseUrl + path, body)
  }
  


}
