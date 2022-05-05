import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast;

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {
  public clientes : Array<any>=[];
  public filtro_nombres = '';
  public filtro_correo = '';

  public page = 1;
  public pageSize = 10;
  public token;
  public load_data =true;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService
  ) { 
   this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.init_Data();
  }
  init_Data(){
    this._clienteService.listar_clientes_filtro_admin(null, null,this.token).subscribe(
      response=>{
     //   console.log(response);
        this.clientes = response.data;
        this.load_data = false;
      },
      error=>{
        console.log(error);
      }
    );
  }
  filtro(tipo){
   

    if(tipo == 'nombres'){
      if(this.filtro_nombres){
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_nombres,this.token).subscribe(
          response=>{
            //console.log(response);
            this.clientes = response.data;
            this.load_data = false;

          },
          error=>{
            console.log(error);
          }
        );
      }else{
        this.init_Data();
      }

    }else if( tipo == 'correo'){
      if(this.filtro_correo){
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_correo,this.token).subscribe(
          response=>{
           // console.log(response);
            this.clientes = response.data;
            this.load_data = false;

          },
          error=>{
            console.log(error);
          }
        );
      }else{
        this.init_Data();
      }
    }


  }
  eliminar(id){
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'Eliminación completada',
          titleColor: '#fff',
          class:'text-success',
          backgroundColor: '#28a745',
          position: 'topRight',
          messageColor: '#fff',
          message: 'Se ha eliminado correctamente el cliente.'
          
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        
        this.init_Data();
      },error=>{
        console.log(error);
      }
    )
  }

}