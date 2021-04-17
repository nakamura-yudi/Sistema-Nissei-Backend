const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');

module.exports={
    async gravar(request,response) {
 
        const {car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_total,ser_status} = request.body;
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
        const sql = "INSERT INTO servico (car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_fim,ser_total,ser_status) VALUES (?, ?, ?, ?,?, ?, null,?,?)";
        
        const valor = [car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_total,ser_status];
        const result = await db.manipula(sql,valor);
        console.log(result);
        return response.json(result);
    },
    async alterar(request,response){
        const {ser_cod,car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_total,ser_status} = request.body;
        console.log(car_id);
      
        const con = await db.conecta();
        const sql = "UPDATE servico SET car_id=?,cli_cod=? ,fun_cod=?,"+
                    "ser_descricao=?,ser_maoObra=?,ser_inicio=?, "+
                    "ser_total=?,ser_status=? "+
                    "WHERE ser_cod = ?";
        
        const valor = [car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_total,ser_status,ser_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async procurarServico(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servico WHERE ser_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);

        return response.json(result.data);
    },
    async listarPorCliente(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "select * from (SELECT * FROM servico where cli_cod=?)serv left join carro "+
                    "on carro.car_id=serv.car_id";
        const valor = [cod];
        const sers = await db.consulta(sql,valor);
        return response.json(sers.data);
    },
    async listarPorCarro(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servico where car_id=?";
        const valor = [cod];
        const sers = await db.consulta(sql,valor);
        return response.json(sers.data);
    },
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM servico";
        const sers = await db.consulta(sql);
        return response.json(sers.data);
    },
    async listarFiltros(request,response){
        const {cli_nome,fun_cod,dt_inicio,dt_saida,mar_cod,car_placa,status} = request.body;
        const con = await db.conecta();
        let valor=[];
        let sql="SELECT s.ser_cod,mar_descricao,p.pes_nome,c.car_placa,s.ser_inicio, ser_status,ser_total ";
        sql+="from Cliente cli,Servico s,Carro c, Marca m, Pessoa p WHERE p.pes_cod=cli.pes_cod ";
        sql+="and s.car_id=c.car_id and m.mar_cod=c.mar_cod and s.cli_cod = cli.pes_cod "
        if(status!=undefined){
            sql+=" and ser_status=?"
            valor.push(status);
        }
        if(cli_nome!=undefined){

            sql+=" and UPPER(cli.cli_nome) LIKE UPPER(?)";
            
            valor.push("%"+cli_nome+"%");
        }
        if(fun_cod!=undefined){
            sql+=" and s.fun_cod=?";
            valor.push(fun_cod);
        }
        if(dt_inicio!=undefined){
            sql+=" and s.ser_inicio>=?";
            valor.push(dt_inicio);
        }
        if(dt_saida!=undefined){
            sql+=" and s.ser_inicio<=?";
            valor.push(dt_saida);
        }
        if(mar_cod!=undefined){
            sql+=" and c.mar_cod=?";
            valor.push(mar_cod);
        }
        if(car_placa!=undefined){
            sql+=" and UPPER(c.car_placa) LIKE UPPER(?)";
            valor.push("%"+car_placa+"%");
        }
        /*
        const sql = "SELECT * FROM servico where CURRENT_DATE()>="+datainicio+ " AND CURRENT_DATE()<="+datafim;
        */
        const sers = await db.consulta(sql,valor);
        console.log(sers);
        return response.json(sers.data);
    },
    async listarPorFuncionario(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servico where fun_cod=?";
        const valor = [cod];
        const sers = await db.consulta(sql,valor);
        return response.json(sers.data);
    },
    async alterarCarroNulo(request,response){
        const {cod} = request.params;;
    
      
        const con = await db.conecta();
        const sql = "UPDATE servico SET car_id=? "+
                    "WHERE car_id = ?";
        
        const valor = [null,cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    }
}