import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {
  public producto : any = {};
  public config : any = {};
  public imgSelect : any | ArrayBuffer;
  public load_btn = false;
  public id;
  public token;
  public file: any | File= undefined;
  public url;



  constructor(
    private _route : ActivatedRoute,
    private _productoService:ProductoService,
    private _router: Router
  ) { 
    this.config = {
      height: 450
    }
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response=>{
           if(response.data == undefined){
            this.producto = undefined;
           }else{
             this.producto = response.data;
             this.imgSelect = this.url+'obtener_portada/'+this.producto.portada;
           }
          },error=>{
            console.log(error)
          }
        )
      } 
    );
  }
  actualizar(actualizarForm){

    if(actualizarForm.valid){

       var data : any = {};

       if ( this.file != undefined){
         data.portada = this.file;
       }

       data.titulo = this.producto.titulo;
       data.stock = this.producto.stock;
       data.precio = this.producto.precio;
       data.categoria = this.producto.categoria;
       data.descripcion = this.producto.descripcion;
       data.contenido = this.producto.contenido;


       this.load_btn = true;
      this._productoService.actualizar_producto_admin(data,this.id,this.token).subscribe(
        response=>{
          console.log(response)
          iziToast.show({
            title: 'Registro correcto: ',
            titleColor: '#fff',
            class:'text-success',
            backgroundColor: '#28a745',
            position: 'topRight',
            messageColor: '#fff',
            message: 'Información actualizada correctamente.'
            
          });
          this.load_btn = false;
          this._router.navigate(['/panel/productos']);
        },error=>{
          console.log(error);
          this.load_btn = false;
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
      this.load_btn = false;
    }
  }
  fileChangeEvent(event:any):void{

    var file;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
      
    }else{
      iziToast.show({
        title: 'Error: ',
        titleColor: '#fff',
        class:'text-danger',
        backgroundColor: '#dc3545',
        position: 'topRight',
        messageColor: '#fff',
        message: 'No se selecciono imagen.'
        
      });

    }

    if(file.size <= 4000000){
      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif'|| file.type == 'image/jpeg'){

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;

        console.log(this.imgSelect);

        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);

        this.file = file;

      }else{
        iziToast.show({
          title: 'Advertencia: ',
          titleColor: '#000',
          class:'text-warning',
          backgroundColor: '#d39e00',
          position: 'topRight',
          messageColor: '#000',
          message: 'El archivo seleccionado de ser tipo imagen.'
          
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }

    }else{
      iziToast.show({
        title: 'Advertencia: ',
        titleColor: '#000',
        class:'text-warning',
        backgroundColor: '#d39e00',
        position: 'topRight',
        messageColor: '#000',
        message: 'La imagen supera los 5MB permitdos.'
        
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    console.log(this.file);
  }

}
