import db from './db.js';
import express from 'express'
import cors from 'cors'
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) =>{
    try{
        let produtos = await db.tb_produto.findAll({ order: [['id_produto', 'desc']] });
        resp.send(produtos);
    }   catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/produto', async (req, resp) =>{
    try{
        let m = req.body;
        let consulta = await db.tb_produto.findOne({ where: {nm_produto: m.produto} });

        if(consulta != null) {
           
        return resp.send({ erro: '😀 Produto já cadastro!'})
        } else {

        
        let r = await db.tb_produto.create({
            nm_produto: m.produto,
            ds_categoria: m.categoria,
            vl_preco_de: m.preco_de,
            vl_preco_por: m.preco_por,
            vl_avaliacao: m.avaliação,
            ds_produto: m.descrição,
            qtd_estoque: m.estoque,
            img_produto: m.linkImagem,
            bt_ativo: true,
            dt_inclusao: new Date()
            
        })
        resp.send(r);

        }
    

    }   catch (e) {
        resp.send({ erro: 'Os campos "Preços", "Avaliação", e "Estoque" tem que conter apenas números!' })
    }
})

app.put('/produto/:id', async (req, resp) =>{
    try{
        let  {produto, categoria, preco_de, preco_por, avaliação, descrição, estoque, linkImagem } = req.body;
        let  { id } = req.params;

        if(produto == "" || categoria == "" || preco_de <= 0  || preco_por <= 0 || avaliação <= 0 || descrição == ""  || estoque <= 0 || linkImagem == "" ) {
            resp.send({ erro: '❌ Campos inválidos!' })
        }   else
        {
            let r = await db.tb_produto.update(
        {
                nm_produto: produto,
                ds_categoria: categoria,
                vl_preco_de: preco_de,
                vl_preco_por: preco_por,
                vl_avaliacao: avaliação,
                ds_produto: descrição,
                qtd_estoque: estoque,
                img_produto: linkImagem
            },
            {
                where: { id_produto: id }
            })
            resp.send(r);
        }
        
    }   catch (e) {
        resp.send({ erro: 'Deu erro no PUT!'})
    }
})

app.delete('/produto/:id', async (req, resp) =>{
    try{
        let { id } = req.params;

        let r = await db.tb_produto.destroy({ where: { id_produto: id} })
        resp.sendStatus(200);
    }   catch (e) {
        resp.send({ erro: 'Deu erro no Delete!' })
    }
})



app.listen(process.env.PORT, x => console.log(`Server up at port ${process.env.PORT}`))