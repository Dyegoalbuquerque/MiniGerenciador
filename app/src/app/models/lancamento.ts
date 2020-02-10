import { Categoria } from './categoria';

export class Lancamento{    

    id: number;
    tipo: string;
    vencimento: Date;
    ano: number;
    mes: string;
    data: Date;
    valor: number;
    descricao: string;
    status: string;
    categoriaId: number;
    categoria: Categoria;

    constructor(){
    }
}
