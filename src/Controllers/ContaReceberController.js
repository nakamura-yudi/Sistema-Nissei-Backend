const axios = require('axios');
const db = require('../models/Database');


module.exports={
    async gravar(request,response) {
 
        const {con_cod,ser_cod,con_valor,con_metodo,con_status} = request.body;
       
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
        const sql = "INSERT INTO conta_receber (con_cod,ser_cod,con_valor,con_metodo,con_status) VALUES (?, ?, ?, ?,?)";
        
        const valor = [con_cod,ser_cod,con_valor,con_metodo,con_status];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async alterar(request,response){
        const {con_cod,ser_cod,con_valor,con_metodo,con_status} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE conta_receber SET con_valor=?,con_metodo=? ,con_status=? "+
                    "WHERE con_cod = ? AND ser_cod=?";
        
        const valor = [con_valor,con_metodo,con_status,con_cod,ser_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async deletar(request,response){
        const {con_cod} = request.params;
        const {ser_cod} = request.params;
      
        const con = await db.conecta();
        const sql = "DELETE FROM conta_receber WHERE con_cod=? AND ser_cod=? "
              
        
        const valor = [con_cod,ser_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async listar(request,response){
        const {ser_cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM conta_receber where ser_cod=?";
        const valor = [ser_cod];
        const contas = await db.consulta(sql,valor);
        return response.json(contas.data);
    }
  
}