const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');
module.exports={
    async gravar(request,response) {
 
        const {pes_cod,fun_anoInicio,fun_senha} = request.body;
       
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
        const sql = "INSERT INTO Funcionario (pes_cod,fun_anoInicio,fun_senha) VALUES (?, ?, ?)";
        
        const valor = [pes_cod,fun_anoInicio,fun_senha];
        const result = await db.manipula(sql,valor);
        
        return response.json(result);
    },
    async alterar(request,response){
        const {pes_cod,fun_anoInicio,fun_senha} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE Funcionario SET fun_anoInicio = ?, fun_senha = ? "+
                    "WHERE pes_cod = ?";
        
        const valor = [fun_anoInicio,fun_senha,pes_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async procurarFunc(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM Funcionario WHERE pes_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);

        return response.json(result.data);
    },
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM Funcionario,Pessoa where Funcionario.pes_cod=Pessoa.pes_cod";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async procurarUser(request,response){
        const email=request.params.email;
        const senha=request.params.senha;
        const con = await db.conecta();
        const sql = "SELECT * FROM Pessoa,Funcionario WHERE Pessoa.pes_cod=Funcionario.pes_cod and pes_email=? and fun_senha=?";
        const valores = [email , senha ];
        const users = await db.consulta(sql,valores);
        return response.json(users.data);
    },
    async deletar(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "DELETE FROM Funcionario WHERE pes_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        return response.json(result.data);
    },
    async deletarLogico(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "UPDATE Funcionario SET fun_status = ? "+
                    "WHERE pes_cod = ?";
        
        const valor = [false,cod];
        const result = await db.consulta(sql,valor);
        return response.json(result.data);
    }
}