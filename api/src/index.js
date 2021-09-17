import db from './db.js';
import express from 'express'
import cors from 'cors'

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
        let  { produto, categoria, preco_de, preco_por, avaliação, descrição, estoque, linkImagem, botao, dataa  } = req.body;

        let r = await db.tb_produto.create({
            nm_produto: produto,
            ds_categoria: categoria,
            vl_preco_de: preco_de,
            vl_preco_por: preco_por,
            vl_avaliacao: avaliação,
            ds_produto: descrição,
            qtd_estoque: estoque,
            img_produto: linkImagem,
            bt_ativo: botao ,
            dt_inclusao: dataa
            
        })
        resp.send(r);

    }   catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.put('/produto/:id', async (req, resp) =>{
    try{
        let  {produto, categoria, preco_de, preco_por, avaliação, descrição, estoque, linkImagem, botao, dataa  } = req.body;
        let  { id } = req.params;

        let r = await db.tb_produto.update(
            {
                nm_produto: produto,
                ds_categoria: categoria,
                vl_preco_de: preco_de,
                vl_preco_por: preco_por,
                vl_avaliacao: avaliação,
                ds_produto: descrição,
                qtd_estoque: estoque,
                img_produto: linkImagem,
                bt_ativo: botao ,
                dt_inclusao: dataa
            },
            {
                where: { id_produto: id }
            }
        )
        resp.sendStatus(200);
    }   catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.delete('/produto/:id', async (req, resp) =>{
    try{
        let { id } = req.params;

        let r = await db.tb_produto.destroy({ where: { id_produto: id} })
        resp.sendStatus(200);
    }   catch (e) {
        resp.send({ erro: e.toString() })
    }
})



app.listen(process.env.PORT, x => console.log(`Server up at port ${process.env.PORT}`))