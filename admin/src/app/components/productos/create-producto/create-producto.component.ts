import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
// import { read } from 'fs';

declare var iziToast;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto : any = {};
  public file:any=undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public config : any = {};
  public token;
  public load_btn = false;


  constructor(
    private _productoService : ProductoService,
    private _adminService : AdminService,
    private _router : Router
  ) { 
    this.config = {
      height: 450
    }

    this.token = this._adminService.getToken();
   
  }

  ngOnInit(): void {
  }

  registro(registroForm){

    if(registroForm.valid){
      if(this.file == undefined){
        iziToast.show({
          title: 'Error: ',
          titleColor: '#fff',
          class:'text-danger',
          backgroundColor: '#dc3545',
          position: 'topRight',
          messageColor: '#fff',
          message: 'Debes agregar una foto de portada al producto.'
          
        });
      }else{
        console.log(this.producto);
        console.log(this.file);
        this.load_btn = true;
        this._productoService.registro_producto_admin(this.producto,this.file,this.token).subscribe(
          response=>{
  
            iziToast.show({
              title: 'Registro correcto: ',
              titleColor: '#fff',
              class:'text-success',
              backgroundColor: '#28a745',
              position: 'topRight',
              messageColor: '#fff',
              message: 'Producto registrado correctamente.'
              
            });
            this.load_btn = false;
            this._router.navigate(['/panel/productos']);
  
          },error=>{
            console.log(error);
            this.load_btn = false;
          }
        );
  
      }
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
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
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
