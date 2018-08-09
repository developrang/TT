import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser : boolean = false; 
    constructor(private authService:AuthService){}

    ngOnInit(){      
     this.authService.Authenticated
     .subscribe(logged => {       
       if(logged){
       this.loggedUser = true;
       } else{
        this.loggedUser = false;
       }
       })

    if(localStorage.getItem('TtToken')){
      this.loggedUser = true;
    } else {
      this.loggedUser = false;
    }
     
    }
    onLogout(){      
      this.authService.logout();
    }
    
}
