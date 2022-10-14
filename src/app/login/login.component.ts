import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Output, Input, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { RoutingService } from '../services/routing.service';
import { ActivatedRoute } from '@angular/router';




import { User } from '../model/user';
// https://www.techiediaries.com/angular-formbuilder-formgroup/
// https://coryrylan.com/blog/angular-form-builder-and-validation-management
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: any;
  registerform!: FormGroup;
  showLogin!: any
  showRegister: boolean | undefined
  newUser: User = new User();
  @Output() userNameLoggedIn = new EventEmitter<string>();
  @Input() isloginOrRegister = '';

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private routing: RoutingService, private users: UsersService) {

    //form for registerd users to login
    this.loginform = this.formBuilder.group({
      userName: ['', Validators.required],
      ID: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      password: ['', Validators.required]
    })

    //form to new users to register
    this.registerform = this.formBuilder.group({
      privateName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      ID: new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("([0-9]+)")])),
      repassword: new FormControl('', Validators.required)
    })


  }

  ngOnInit(): void {
    // if(this.activatedRoute.snapshot.paramMap.get('type') == 'register'){
    //   this.showLogin = false
    // }else if(this.activatedRoute.snapshot.paramMap.get('type') == 'login'){
    //   this.showLogin = true
    // } else{
    //   alert('בעיה במערכת')
    //   this.routing.navigate('')
    // }

  }
  // insted of using navigate and params in ngOnInit- use subjects input and output in ngOnChanges
  ngOnChanges(){
    console.log(this.isloginOrRegister);
    
    if(this.isloginOrRegister == 'register'){
      this.showLogin = false
    }else if(this.isloginOrRegister == 'login'){
      this.showLogin = true
    } else{
      console.log(this.showLogin)
    }
  }

  loginUser!: User;
  onSubmitLogin() {
    console.log(this.loginform.value);

    this.routing.get('getUserByID/' + this.loginform.value.ID).subscribe(d => {

      this.loginUser = d
      if (this.loginUser.UserName) {
        this.loginUser.UserName = this.loginUser.UserName.replace(/\s/g, ""); // remove white spaces from user name
      }

      console.log(this.loginUser.Id + " user login ID")

      if ((this.loginUser) &&
        (this.loginUser.Id == this.loginform.value.ID && this.loginUser.Password == this.loginform.value.password && this.loginUser.UserName == this.loginform.value.userName)) {
        console.log('good access');
        //this.routing.navigate('user/' + this.loginform.value.userName) // pass user name that login to plants-all component
        this.userNameLoggedIn.emit(this.loginUser.UserName);

      } else {
        alert('שם משתמש או סיסמא לא נכונים')
      }
    }, err => {
      if (err.status == 404) {
        alert('ת.ז לא קיים')
      } else {
        console.log(err);
        this.routing.navigate('/')
      }

    })
  }

  onSubmitRegister() {
    console.log(this.registerform.value);
    this.newUser.Id = this.registerform.value.ID;
    this.newUser.PivateName = this.registerform.value.privateName;
    this.newUser.LastName = this.registerform.value.lastName;
    this.newUser.Password = this.registerform.value.password;
    this.newUser.UserName = this.registerform.value.privateName + this.registerform.value.lastName[0];
    this.routing.post('registerNewUser', this.newUser).subscribe(d => {
      this.newUser = d
    })
    console.log("success to register:");
    console.log(this.newUser);
    // this.users.currentUser = this.registerform.value.privateName;
    // this.users.allowToBuy = true;
    // this.routing.navigate('')
          //////////////////////////// this line was when i used navigate between components:
          //   this.routing.navigate('user/' + this.newUser.UserName) // pass user name that login to plants-all component
          //////////////////////////// i use now subject instead:
    this.userNameLoggedIn.emit(this.newUser.UserName);

  }

}


