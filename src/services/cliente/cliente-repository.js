
import { Dao } from '../../data/dao';

export class ClienteRepository {

    constructor() {
        this.dao = new Dao('cliente');
    }

    async obterTodos() {
        let todos = this.dao.obterTodos();

        return todos;
    }
    async obterPorId(id) {
        let item = this.dao.buscarPorId(id);

        return item;
    }

    async salvar(item) {
        let id = this.dao.adicionar(item);
        item.id = id;

        return item.id;
    }

    async max() {
        return this.dao.max();
    }

    async remover(id) {
       this.dao.removerPorId(id);
    }
    
    async atualizar(item) {
        return this.dao.atualizar(item);
    }
}