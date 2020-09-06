import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {Lista} from '../../models/lista.model';
import {Router} from '@angular/router';
import {AlertController, IonList} from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList) lista: IonList;

  constructor(public deseosService:DeseosService, private router:Router, private alertCtrl:AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista:Lista){

    if (this.terminada){
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
    }

  }

  borrarLista(lista: Lista){
    this.deseosService.borrarLista(lista);
  }

  async cambiarNombre(lista:Lista){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cambiar nombre',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
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
          text: 'Actualizar',
          handler: ( data ) =>{
            console.log(data);
            if (data.length === 0){
              this.lista.closeSlidingItems();
              return;
            }else {
              lista.titulo = data.titulo;
              this.deseosService.guardarStorage();
              this.lista.closeSlidingItems();
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
