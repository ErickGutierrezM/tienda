import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

public cliente : any = {
  genero : ''
};
public token;
public load_btn = false;

  constructor(
    private _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router:Router
  ) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }
  registro(registroForm){
    if(registroForm.valid){
      console.log(this.cliente);
      this.load_btn = true;
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
        response=>{
            console.log(response);
            iziToast.show({
              title: 'Registro correcto: ',
              titleColor: '#fff',
              class:'text-success',
              backgroundColor: '#28a745',
              position: 'topRight',
              messageColor: '#fff',
              message: 'Cliente registrado correctamente.'
              
            });
            this.cliente = {
              genero: '',
              nombres: '',
              apellidos: '',
              email: '',
              telefono: '',
              f_nacimiento: ''

            }
            this.load_btn = false;

            this._router.navigate(['/panel/clientes']);
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
