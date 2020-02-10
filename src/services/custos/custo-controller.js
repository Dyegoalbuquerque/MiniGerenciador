
import { LancamentoRepository } from './lancamento-repository';
import { CategoriaRepository } from './categoria-repository';
import { Constantes } from './constantes';

export class CustoController {

   constructor() {
      this.lancamentoRepository = new LancamentoRepository();
      this.categoriaRepository = new CategoriaRepository();
   }

   lancamentoRepository;
   categoriaRepository;

   async obterLancamentosPorAno(ano) {
      let result = await this.lancamentoRepository.obterPorAno(ano);
      let categorias = await this.categoriaRepository.obterTodos();

      for(let i =0; i < result.length; i++){
         result[i].categoria = categorias.filter(c => c.id == result[i].categoriaId)[0];
      }

      return result;
   }

   async removerLancamento(id) {

       await this.lancamentoRepository.remover(id);

      return id;
   }

   async salvarLancamento(item) {

      let vencimento = new Date(item.vencimento);

      item.data = new Date();
      item.mes = vencimento.getNameMonthPtBr(vencimento.getMonth());
      item.ano = vencimento.getFullYear();
      let resultado = await this.lancamentoRepository.salvar(item);

      return resultado;
   }

   async confirmarPagamentoLancamento(item){
      item = await this.lancamentoRepository.obterPorId(item.id);

      item.status = Constantes.StatusLancamentoPago();
      let resultado = await this.lancamentoRepository.atualizar(item);

      return resultado;
   }

   async obterGategorias(){
      let result = await this.categoriaRepository.obterTodos();

      return result;
   }
}