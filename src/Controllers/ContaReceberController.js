const axios = require('axios');
const db = require('../models/Database');


module.exports={
    async gravar(request,response) {
 
        const {con_cod,ser_cod,con_valor,con_dtVencimento} = request.body;
       
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
  
        const sql = "INSERT INTO conta_receber (con_cod,ser_cod,con_valor,con_dtVencimento) VALUES (?, ?, ?, ?)";
        
        const valor = [con_cod,ser_cod,con_valor,con_dtVencimento];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async alterar(request,response){
        const {con_cod,ser_cod,con_dtPgto} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE conta_receber SET con_dtPgto=? "+
                    "WHERE con_cod = ? AND ser_cod=?";
        
        const valor = [con_dtPgto,con_cod,ser_cod];
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
    async deletarPorServico(request,response){
        const {ser_cod} = request.params;
      
        const con = await db.conecta();
        const sql = "DELETE FROM conta_receber WHERE ser_cod=? "
              
        
        const valor = [ser_cod];
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
    },
    async listarContasPagas(request,response){
        const {ser_cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM conta_receber where ser_cod=? and con_dtPgto is not null";
        const valor = [ser_cod];
        const contas = await db.consulta(sql,valor);
        return response.json(contas.data);
    },
    async listarFiltros(request,response){
        const dtInicio = request.query["dt_inicio"];
        const dtFim = request.query["dt_fim"];
        const status = request.query["status"];
        let hasParameter=false;

        let valor=[];
        const con = await db.conecta();
        let sql = "SELECT * FROM conta_receber ";
        if(dtInicio){
            
            sql+=" where con_dtVencimento >= ?"
            valor.push(dtInicio);
            hasParameter=true;
        }
        if(dtFim){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" con_dtVencimento<=?";
            valor.push(dtFim);
        }
        if(status){
            
                
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;
            if(status=="Pagamento efetuado")
                sql+=" con_dtPgto is not null";
            else
            sql+=" con_dtPgto is null";
        }
        const contas = await db.consulta(sql,valor);
        return response.json(contas.data);
    }
  
}