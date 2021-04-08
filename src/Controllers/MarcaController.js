const axios=require('axios');
const db=require('../models/Database');

module.exports={
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM marca";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async procurarCod(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM marca WHERE cod_id=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
    async gravar(request,response) {
 
        const {mar_descricao} = request.body;
       
     
        const con = await db.conecta();
        const sql = "INSERT INTO marca (mar_descricao) VALUES (?)";
        
        const valor = [mar_descricao];
        const result = await db.manipula(sql,valor);
        if(!result.status)
            console.log("Ja cadastrado");
        
        return response.json(result);
    },
    async alterar(request,response){
        const {mar_cod,mar_descricao} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE marca set mar_descricao=? "+
                    "WHERE mar_cod = ?";
        
        const valor = [mar_descricao,mar_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
}