import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast;

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id;
  public token;
  public _iduser;
  public producto : any = {};

  public inventarios : Array<any>=[];

  //variables para el formulario de agregar inventarios

  public inventario : any = {};


  //----------

  public load_btn = false;


  constructor(
    private _route : ActivatedRoute,
    private _productoService:ProductoService,
  ) { 
    this.token = localStorage.getItem('token');
    this._iduser = localStorage.getItem('_id');
    console.log(this._iduser);
  }
 
  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];

     

        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response=>{
           if(response.data == undefined){
            this.producto = undefined;
           }else{
            
             this.producto = response.data;
            //  console.log(this.producto);
             this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
               response=>{
                
                this.inventarios = response.data;
               
               },error=>{
                
               }
             )


             
             
           }
          },error=>{
            
          }
        )
      } 
    );
  }
  eliminar(id){ 
    this.load_btn = true;
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'Eliminación completada',
          titleColor: '#fff',
          class:'text-success',
          backgroundColor: '#28a745',
          position: 'topRight',
          messageColor: '#fff',
          message: 'Se ha eliminado correctamente el producto.'
          
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;
        
        this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
          response=>{
           console.log(response);
           this.inventarios = response.data;
           console.log(this.inventarios);
          },error=>{
           console.log(error)
          }
        )
      },error=>{
        iziToast.show({
          title: 'Eliminación completada',
          titleColor: '#000',
          class:'text-success',
          backgroundColor: '#ffc107',
          position: 'topRight',
          messageColor: '#000',
          message: 'Ha ocurrido un error en el servidor '
          
        });
        console.log(error);
        this.load_btn = false;
      }
    )
  }

  registro_inventario(inventarioForm){
    if(inventarioForm.valid){
      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._iduser,
        proveedor: inventarioForm.value.proveedor
      }
      console.log(data);

      this._productoService.registro_inventario_producto_admin(data, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'Registro correcto: ',
            titleColor: '#fff',
            class:'text-success',
            backgroundColor: '#28a745',
            position: 'topRight',
            messageColor: '#fff',
            message: 'Se agrego el nuevo stock correctamente.'
            
          }); 
          this.inventario = {
            cantidad: '',
            proveedor: ''

          }
          this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
            response=>{
             
             this.inventarios = response.data;
            
            },error=>{
             
            }
          )
        },error=>{
          console.log(error)
        }
      )

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
