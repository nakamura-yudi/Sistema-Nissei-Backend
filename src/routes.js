const {Router}=require('express');
const routes=Router();

const clienteCtrl=require('./Controllers/ClienteController')
const pessoaCtrl=require('./Controllers/PessoaController');
const marcaCtrl=require('./Controllers/MarcaController');
const carroController=require('./Controllers/CarroController');
const pecaController=require('./Controllers/PecaController');
const funcController=require('./Controllers/FuncController');
const contatoCtrl=require('./Controllers/ContatoController');
const servicoCtrl=require('./Controllers/ServicoController');
const serPecaCtrl=require('./Controllers/ServicoPecaController');

routes.post('/peca',pecaController.gravar);
routes.put('/peca',pecaController.alterar);
routes.get('/peca/:cod',pecaController.procurarCod);

routes.post('/carro',carroController.gravar);
routes.put('/carro',carroController.alterar);
routes.get('/carros',carroController.listar);
routes.get('/carro/:cod',carroController.procurarCod);
routes.get('/carroPes/:cod',carroController.procurarCodPessoa);

routes.get('/marcas',marcaCtrl.listar);

routes.post('/pessoas',pessoaCtrl.gravar);
routes.get('/pessoaCod/:cod',pessoaCtrl.procurarCod)
routes.get('/pessoasCli',pessoaCtrl.listarCliente);
routes.get('/pessoasFun',pessoaCtrl.listarFuncionario);
routes.get('/pessoaCpf/:cpf',pessoaCtrl.procurarCPF);
routes.put('/pessoa',pessoaCtrl.alterar);
routes.get('/pessoaEmail/:email',pessoaCtrl.validarEmail);

routes.post('/clientes',clienteCtrl.gravar);
routes.put('/clientes',clienteCtrl.alterar);
routes.get('/clienteCod/:cod',clienteCtrl.procurarCliente);
routes.get('/cliente',clienteCtrl.listar);

routes.post('/contatos',contatoCtrl.gravar);
routes.get('/contatos/:cod',contatoCtrl.listarCod);
routes.delete('/contato/:cod',contatoCtrl.excluir);

routes.get('/func/:email/:senha',funcController.procurarUser);
routes.post('/func',funcController.gravar);
routes.put('/func',funcController.alterar);
routes.get('/func',funcController.listar);
routes.get('/func/:cod',funcController.procurarFunc);

routes.post('/servico',servicoCtrl.gravar);
routes.get('/servicoCarro/:cod',servicoCtrl.listarPorCarro);
routes.get('servicoCliente/:cod',servicoCtrl.listarPorCliente);
routes.get('/servico/:cod',servicoCtrl.procurarServico);
routes.get('/servico/:datainicio/:datafim',servicoCtrl.listarPorData);
routes.put('/servico',servicoCtrl.alterar);

routes.post('./servicopeca',serPecaCtrl.gravar);
routes.put('./servicopeca',serPecaCtrl.alterar);
routes.delete('./servicopeca',serPecaCtrl.deletar);
routes.get('./servicopeca/:ser_cod',serPecaCtrl.listar);
module.exports=routes;