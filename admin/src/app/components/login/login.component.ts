import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminService } from 'src/app/services/admin.service';
declare var jQuery:any;
declare var $:any;
declare var iziToast;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any= {};
  public usuario : any = {};
  public token : any ='';

  constructor(
    private _adminService:AdminService,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    console.log(this.token);
    if(this.token){
      //mandar a inicio
      this._router.navigate(['/']);

    }else{
      //mantener en el login
    }
  }

  login(loginForm){
    if(loginForm.valid){
      console.log(this.user);
      let data = {
        email: this.user.email,
        password: this.user.password
      }
      this._adminService.login_admin(data).subscribe(
        response=>{
          if(response.data == undefined ){
            iziToast.show({
              title: 'Error: ',
              titleColor: '#fff',
              class:'text-danger',
              backgroundColor: '#dc3545',
              position: 'topRight',
              messageColor: '#fff',
              message: response.message
              
            });
          }else{
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id',response.data._id);

            this._router.navigate(['/']);

          }

          console.log(response);
        },
        error=>{
          console.log(error);
        }
      );
    }else{
      iziToast.show({
        title: 'Error: ',
        titleColor: '#fff',
        class:'text-danger',
        backgroundColor: '#dc3545',
        position: 'topRight',
        messageColor: '#fff',
        message: 'Los datos del formulario no son validos'
        
      });
    }
  }

}

