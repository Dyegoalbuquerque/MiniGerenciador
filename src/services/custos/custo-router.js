import express from 'express';
import { CustoController } from './custo-controller';

let router = express.Router();

let handlerHttpResponse = (e, res) => {
     
    console.log(e);

    return res.send(500, 'error interno no servidor');

};

let custoController = new CustoController();


router.get('/:ano', async (req, res) => {
    try {
        var ano = req.params.ano.replace(':', '');  
        var data = await custoController.obterLancamentosPorAno(ano); 
        return res.send(200, data);

    } catch (e) {      
        return handlerHttpResponse(e, res);
    } 
});

router.get('/ciclo/:ano',  async (req, res) => { 

     try {
        var ano = req.params.ano.replace(':', '');  
        var data = await custoController.obterCiclosPorAno(ano); 
        return res.send(200, data);

    } catch (e) {      
        return handlerHttpResponse(e, res);
    }   
});

router.post('/ciclo/filhos', async (req, res) => {
    try {
        var data = await custoController.obterCiclosFilhosPorIds(req.body); 
        return res.send(200, data);

    } catch (e) {      
        return handlerHttpResponse(e, res);
    } 
});

router.post('/ciclo',  async (req, res) => { 

    try {
       var data = await custoController.salvarCiclo(req.body);
       return res.send(201, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});

router.put('/ciclo',  async (req, res) => { 

    try {
       var data = await custoController.atualizarCiclo(req.body);
       return res.send(200, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});
 
router.post('/simularCiclo',  async (req, res) => { 

    try {
       var data = await custoController.simularCiclo(req.body); 
       return res.send(200, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});

router.delete('/ciclo/:id',  async (req, res) => { 

    try {

        var id = req.params.id.replace(':', ''); 
        var data = await custoController.removerCiclo(id); 
       return res.send(201, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});

router.get('/lancamento/:ano',  async (req, res) => { 

    try {
       var ano = req.params.ano.replace(':', '');  
       var data = await custoController.obterLancamentosPorAno(ano); 
       return res.send(200, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});

router.delete('/lancamento/:id',  async (req, res) => { 

    try {

        var id = req.params.id.replace(':', ''); 
        var data = await custoController.removerLancamento(id); 
       return res.send(201, data);

   } catch (e) {      
       return handlerHttpResponse(e, res);
   }   
});

router.post('/lancamento',  async (req, res) => { 

   try {
      var data = await custoController.salvarLancamento(req.body); 
      return res.send(201, data);

  } catch (e) {      
      return handlerHttpResponse(e, res);
  }   
});

router.post('/lancamento/confirmarPagamento',  async (req, res) => { 

   try {

       var data = await custoController.confirmarPagamentoLancamento(req.body); 
      return res.send(200, data);

  } catch (e) {      
      return handlerHttpResponse(e, res);
  }   
});

router.get('/categoria/obter', async (req, res) => {
    try { 
        var data = await custoController.obterGategorias(); 
        return res.send(200, data);

    } catch (e) {      
        return handlerHttpResponse(e, res);
    } 
});


export default router;