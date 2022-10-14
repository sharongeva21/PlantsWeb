import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Info } from '../model/Info';
import { UsersService } from '../services/users.service';
import { RoutingService } from '../services/routing.service';

@Component({
  selector: 'app-plants-all',
  templateUrl: './plants-all.component.html',
  styleUrls: ['./plants-all.component.css']
})
export class PlantsAllComponent implements OnInit {

  userName!: any
  public info: Info;
  displayInfo: boolean | undefined;
  displayConnect: boolean = false;
  displayRegister: boolean = false;
  displayLogin: boolean = false;
  PlantImageNameAndID: any = [] // to get names of img and ids of plant to loop and call for images and information in html
  imgName: string | undefined;
  data: any | undefined;
  plant: any | undefined;
  getInfoForBuy: boolean = false; // check if use getInfo() just for information or for buy plant
  allowToBuy: boolean = false;
  registerOrLogin!: string
  showRegisterOrLogin!: boolean;

  constructor(
    private users: UsersService,
    private routing: RoutingService,
    private activatedRoute: ActivatedRoute
  ) {

    this.info = new Info();


  }
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.paramMap.get('id');
    this.allowToBuy = true
    this.showRegisterOrLogin = false
    if(!this.userName){
      console.log("not login");
      this.userName='אורח'
      this.allowToBuy = false
    }
    
    this.routing.get('allplants').subscribe(d => {
      this.data = d
      console.log(this.data);
      for (let index = 0; index < this.data.length; index++) {
        let correctimgName = this.data[index].PlantImgSourceName.replace(/\s/g, ""); // remove white spaces in the end of the img name 
        this.PlantImageNameAndID.push([correctimgName, this.data[index].PlantId])
      }
      console.log(this.PlantImageNameAndID);
    })
  }



  // https://betterprogramming.pub/building-a-restful-api-with-asp-net-web-api-and-sql-server-ce7873d5b331
  getInfo(imgName: string, Plantid: number) {
    this.routing.get('GetPlantDetailsById/' + Plantid + '').subscribe(d => {
      this.plant = d
      console.log(this.plant);

      // when displayInfo is true information dialog shown on click 
      this.displayInfo = true;
      // pupolate the information dialog
      this.info.plantName = this.plant.PlantName
      this.info.plantIrrigationInstructions = this.plant.plantIrrigationInstructions
      this.info.plantPlace = this.plant.plantPlace
      this.info.plantPrice = this.plant.plantPrice
      this.info.PlantId = this.plant.PlantId
      this.imgName = imgName;

      if (this.getInfoForBuy) {
        this.routing.navigate('/buyPlant', { plantToBuy: JSON.stringify(this.info) })
      }
    })

  }

  userLoginOrRegister() {
    this.displayConnect = true;
  }

  _login() {
    this.registerOrLogin = 'login';
    this.showRegisterOrLogin = true;
    // this.routing.navigate('login/' + this.registerOrLogin)

  }

  register() {
    this.registerOrLogin = 'register';
    this.showRegisterOrLogin = true;
    // this.routing.navigate('login/' + this.registerOrLogin)
  }

  disconnect(d: any) { // just for test - remove it when it wiil be disconnect
    this.userName = 'אורח';
    this.allowToBuy = false;
    // console.log(d);
    this.routing.navigate('')
  }
  buyPlant(imgNameOrInfo: any, id?: number) {
    if(!this.allowToBuy){
      return
    }
    console.log(imgNameOrInfo);
    console.log(id);

    if (id) {
      this.getInfoForBuy = true;
      imgNameOrInfo = imgNameOrInfo.toString();
      this.getInfo(imgNameOrInfo, id);
      this.displayInfo = false
    }

    if (!id) {
      this.routing.navigate('/buyPlant', { plantToBuy: JSON.stringify(imgNameOrInfo) })
    }

  }
  getUserNameFromLoginOrRegister(value: string){
    this.userName = value;
    if(!this.userName){
      alert('בעיה כלשהי')
      console.log(this.userName);
      return
    }
    this.showRegisterOrLogin = false
    this.displayConnect = false
    this.allowToBuy = true;
  } 


}
