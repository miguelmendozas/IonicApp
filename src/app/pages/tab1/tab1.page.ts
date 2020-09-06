import { Component } from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Lista} from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(public deseosService: DeseosService, private router:Router,private alertCtrl:AlertController) {

  };

  async agregarLista(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'crear',
          handler: ( data ) =>{
            console.log(data);
            if (data.length === 0){
              return;
            }else {
              const listaId  = this.deseosService.crearLista(data.titulo);
                this.router.navigateByUrl(`tabs/tab1/agregar/${listaId}`);
            }
          }
        }
      ]
    });

    await alert.present();

  };

  listaSeleccionada(lista:Lista){
    this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
  }


}
