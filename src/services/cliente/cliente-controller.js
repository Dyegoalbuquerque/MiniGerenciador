
import { ClienteRepository } from './cliente-repository';

export class ClienteController {

   constructor() {
      this.clienteRepository = new ClienteRepository();
   }

   clienteRepository;

   async atualizarCliente(item) {

      let result = await this.clienteRepository.atualizar(item);

     return result;
  }

   async removerCliente(id) {

       await this.clienteRepository.remover(id);

      return id;
   }

   async salvarCliente(item) {

      item.dataCadastro = new Date();
      let resultado = await this.clienteRepository.salvar(item);

      return resultado;
   }

   async obterTodosClientes(){
      let result = await this.clienteRepository.obterTodos();

      return result;
   }

   async obterClientePorId(id){
      let result = await this.clienteRepository.obterPorId(id);

      return result;
   }
}