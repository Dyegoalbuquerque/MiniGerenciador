
import { Dao } from '../../data/dao';

export class CategoriaRepository {

    constructor() {
        this.dao = new Dao('categoria');
    }

    async obterTodos() {
        let todos = this.dao.obterTodos();

        return todos;
    }
    async obterPorId(id) {
        let item = this.dao.buscarPorId(id);

        return item;
    }
}