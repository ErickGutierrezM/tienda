import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';
declare var iziToast;


@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente:any = {};
  public id;
  public token;
  public load_btn = false;
  public load_data = true;


  constructor(
    private _route : ActivatedRoute,
    private _clienteService : ClienteService,
    private _adminSerivice : AdminService,
    private _router:Router
  ) { 
    this.token = this._adminSerivice.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._clienteService.obtener_cliente_admin(this.id,this.token).subscribe(
          response=>{
            console.log(response);

            if(response.data == undefined){
              this.cliente = undefined;
              this.load_data = false;
            }else{
              this.cliente = response.data;
             this.load_data = false;
            }

          },
          error=>{
            //console.log(error);

          }
        );
      }
    )

    
  }
  actualizar(updateForm){
    if(updateForm.valid){
      this.load_btn = true;
      this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'Actualizción completada: ',
            titleColor: '#fff',
            class:'text-success',
            backgroundColor: '#28a745',
            position: 'topRight',
            messageColor: '#fff',
            message: 'Se ha actualizado correctamente la información.'
            
          });
          this.load_btn = false;

          this._router.navigate(['/panel/clientes']);
        }, error=>{
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
