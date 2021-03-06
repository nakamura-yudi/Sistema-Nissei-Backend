const axios = require('axios');
const db = require('../models/Database');


module.exports={
    async gravar(request,response) {
 
        const {ser_cod,pec_cod,uti_precoUni,uti_qtde} = request.body;
        
        const con = await db.conecta();
        const sql = "INSERT INTO servicopecas (ser_cod,pec_cod,uti_precoUni,uti_qtde) VALUES (?, ?, ?, ?)";
        
        const valor = [ser_cod,pec_cod,uti_precoUni,uti_qtde];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async alterar(request,response){
        const {ser_cod,pec_cod,uti_precoUni,uti_qtde} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE servicopecas SET uti_precoUni=?,uti_qtde=? ,"+
                    "WHERE ser_cod = ? AND pec_cod=?";
        
        const valor = [uti_precoUni,uti_qtde,ser_cod,pec_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async deletar(request,response){
        const ser_cod = request.params.ser_cod;
        const pec_cod = request.params.pec_cod;
        const con = await db.conecta();
        const sql = "DELETE FROM servicopecas WHERE ser_cod=? AND pec_cod=? "
              
        
        const valor = [ser_cod,pec_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async listar(request,response){
        const {ser_cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servicopecas s,peca p where s.ser_cod=? and s.pec_cod=p.pec_cod";
        const valor = [ser_cod];
        const pecas = await db.consulta(sql,valor);
        return response.json(pecas.data);
    },
    async listarPecas(request,response){
        const {pec_cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servicopecas s where pec_cod=?";
        const valor = [pec_cod];
        const pecas = await db.consulta(sql,valor);
        return response.json(pecas.data);
    }

  
}