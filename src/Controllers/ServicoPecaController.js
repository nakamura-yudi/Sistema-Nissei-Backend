const axios = require('axios');
const db = require('../models/Database');
const { listar } = require('./ClienteController');

module.exports={
    async gravar(request,response) {
 
        const {ser_cod,pec_cod,uti_precoUni,uti_qtde} = request.body;
       
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
        const sql = "INSERT INTO servicopeca (ser_cod,pec_cod,uti_precoUni,uti_qtde) VALUES (?, ?, ?, ?)";
        
        const valor = [ser_cod,pec_cod,uti_precoUni,uti_qtde];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async alterar(request,response){
        const {ser_cod,pec_cod,uti_precoUni,uti_qtde} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE servicopeca SET uti_precoUni=?,uti_qtde=? ,"+
                    "WHERE ser_cod = ? AND pec_cod=?";
        
        const valor = [uti_precoUni,uti_qtde,ser_cod,pec_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async deletar(request,response){
        const {ser_cod} = request.params;
        const {pec_cod} = request.params;
      
        const con = await db.conecta();
        const sql = "DELETE FROM servicopeca WHERE ser_cod=? AND pec_cod=? "
              
        
        const valor = [ser_cod,pec_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async listar(request,response){
        const {ser_cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servicopeca where ser_cod=?";
        const valor = [ser_cod];
        const pecas = await db.consulta(sql,valor);
        return response.json(pecas.data);
    }
  
}