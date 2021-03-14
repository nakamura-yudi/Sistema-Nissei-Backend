const axios=require('axios');
const db=require('../models/Database');

module.exports={
    async listarCod(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM Contato where pes_cod=?";
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        return response.json(result.data);
    },

    async gravar(request,response) {
 
        const {pes_cod,cont_numero,cont_tipo} = request.body;
       
     
        const con = await db.conecta();
        const sql = "INSERT INTO Contato (pes_cod,cont_numero,cont_tipo) VALUES (?,?,?)";
        
        const valor = [pes_cod,cont_numero,cont_tipo];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async excluir(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "DELETE FROM Contato WHERE cont_cod=?";
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    }
}