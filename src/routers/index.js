import express from 'express';
import custoRoute from '../services/custos/custo-router';
import clienteRoute from '../services/cliente/cliente-router';

let router = express.Router();

router.use('/api/custo', custoRoute);
router.use('/api/cliente', clienteRoute);

export default router;
