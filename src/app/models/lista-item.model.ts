export class ListaItem {
    descripcion: string;
    completado:boolean;

    constructor(description:string) {
        this.descripcion=description;
        this.completado=false;
    }
}
