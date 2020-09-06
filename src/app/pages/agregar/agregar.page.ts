import { Component, OnInit } from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {ActivatedRoute} from '@angular/router';
import {Lista} from '../../models/lista.model';
import {ListaItem} from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {


  lista:Lista;
  nombreItem = '';
  constructor(private deseosSrevice:DeseosService, private route:ActivatedRoute) {
    const listaId = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.deseosSrevice.obtenrLista(listaId);
  }

  ngOnInit() {
  }

  agregarItem(){

    if (this.nombreItem.length === 0){
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.deseosSrevice.guardarStorage();
  }

  cambio(item:ListaItem){
    console.log(item);
    const  pendiente = this.lista.items.filter( itemData=> !itemData.completado).length;

    if (pendiente === 0 ){
      this.lista.terminadaEn =new Date();
      this.lista.completada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this.deseosSrevice.guardarStorage();
  }

  borrar(i:number){
    this.lista.items.splice(i,1);
    this.deseosSrevice.guardarStorage();
  }
}
