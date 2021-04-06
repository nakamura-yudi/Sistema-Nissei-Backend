const axios=require('axios');
const db=require('../models/Database');

module.exports={
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM peca";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async procurarCod(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM peca WHERE pec_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
    async gravar(request,response) {
 
        const {pec_descricao} = request.body;
  
        const con = await db.conecta();
        const sql = "INSERT INTO peca (pec_descricao) VALUES (?)";
        
        const valor = [pec_descricao];
        const result = await db.manipula(sql,valor);
        console.log(result.lastId);
        const sql2 = "SELECT * FROM peca WHERE pec_cod=?";
        const valor2=[result.lastId];
        const result2 = await db.consulta(sql2,valor2);
        return response.json(result2.data);
    },
    async alterar(request,response){
        const {pec_cod,pec_descricao} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE peca SET pec_descricao=? "+
                    "WHERE pec_cod = ?";
        
        const valor = [pec_descricao,pec_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
}