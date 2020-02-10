import express from 'express';
import { ClienteController } from './cliente-controller';

let router = express.Router();

let handlerHttpResponse = (e, res) => {
     
    console.log(e);

    return res.send(500, 'error interno no servidor');

};

let clienteController = new ClienteController();

router.get('/',  async (req, res) => { 

    try {
       var data = await clienteController.obterTodosClientes(); 
       return res.send(200, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});

router.get('/:id', async (req, res) => {
    try {
        var id = req.params.id.replace(':', '');  
        var data = await clienteController.obterClientePorId(id); 
        return res.send(200, data);

    } catch (e) {      
        return handlerHttpResponse(e, res);
    } 
});

router.post('/', async (req, res) => {
    try {
        var data = await clienteController.salvarCliente(req.body); 
        return res.send(201, data);

    } catch (e) {      
        return handlerHttpResponse(e, res);
    } 
});

router.put('/',  async (req, res) => { 

    try {
       var data = await clienteController.atualizarCliente(req.body);
       return res.send(200, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});

router.delete('/:id',  async (req, res) => { 

    try {

        var id = req.params.id.replace(':', ''); 
        var data = await clienteController.removerCliente(id); 
       return res.send(200, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});

export default router;