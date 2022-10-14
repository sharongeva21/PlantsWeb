import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public register:boolean = false;
  public login:boolean = false;
  public currentUser: string = 'אורח';
  public allowToBuy: boolean = false;
}
