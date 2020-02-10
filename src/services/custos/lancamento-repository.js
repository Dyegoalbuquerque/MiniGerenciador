
import { Dao } from '../../data/dao';

export class LancamentoRepository {

    constructor() {
        this.dao = new Dao('lancamento');
    }

    async obterPorCicloId(cicloId) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.cicloId == cicloId);

        return result;
    }

    async obterPorAno(ano) {
        let todos = this.dao.obterTodos();

        //let result = todos.filter(e => e.status == "PG");

        return todos;
    }

    async obterPorMes(mes) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.mes == new Date().getNameMonthPtBr(mes));

        return result;
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