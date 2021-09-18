
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'


import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'

import { useState, useEffect, useRef } from 'react';

import Api from '../../service/api';
const api = new Api();

export default function Index() {

    const [produto, setProduto] = useState([]);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [preco_de, setPreco_de] = useState('');
    const [preco_por, setPreco_por] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [estoque, setEstoque] = useState('');
    const [linkImagem, setLinkImagem] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idAlterando, setidAlterando] = useState(0);

    const loading = useRef(null);

    async function listar() {
        let r = await api.listar();
        setProduto(r);
    }


    async function inserir() {
        loading.current.continuousStart();
        
        if (idAlterando == 0 ){
        let r = await api.inserir(nome, categoria, preco_de, preco_por, avaliacao, descricao, estoque, linkImagem);
            
        if(r.erro) 
            alert(r.erro);
         else 
         alert('💕 Produto cadastrado com sucesso!');
            
        } else {
            let r = await api.alterar( idAlterando, nome, categoria, preco_de, preco_por, avaliacao, descricao, estoque, linkImagem);
            if(r.erro) 
            alert(r.erro)
             else 
            alert('✏️ Produto alterado!');
            }
        
        loading.current.complete();

        limparcampo();
        listar();
        }
    

    function limparcampo () {
        setNome('');
        setCategoria('');
        setPreco_de('');
        setPreco_por('');
        setAvaliacao('');
        setDescricao('');
        setEstoque('');
        setLinkImagem('');
        setidAlterando(0);
    }

    async function remover(id) {
        confirmAlert({
            title: 'Remover Produto',
            message: `Tem certeza que deseja remover o produto ${id} ?`,
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                  let r = await api.remover(id);
                  if (r.error)
                    toast.error(`${r.error}`);
                  else {
                    toast.dark('🗑️ Produto removido!');
                    listar();
                  }
                }
              },
              {
                label: 'Não'
              }
            ]
          });
        }

    async function editar(item) {
        setNome(item.nm_produto);
        setCategoria(item.ds_categoria);
        setPreco_de(item.vl_preco_de);
        setPreco_por(item.vl_preco_por);
        setAvaliacao(item.vl_avaliacao);
        setDescricao(item.ds_produto);
        setEstoque(item.qtd_estoque);
        setLinkImagem(item.img_produto);
        setidAlterando(item.id_produto);
    }

    useEffect(() =>{
        listar();
    }, [] )



    return (
        <Container>
            <LoadingBar color="blue" ref={loading}/>
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student"> {idAlterando == 0 ? "Produto Novo" : "Alterando Produto " + idAlterando} </div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input type="text" value={nome} onChange={e => setNome(e.target.value)}  /> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria: </div>  
                                    <div class="input"> <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={avaliacao} onChange={e => setAvaliacao(e.target.value)} maxLength="5" /> </div> 
                                </div>
                                <div class="agp-input-longo1">
                                    <div class="number-student"> Link Imagem: </div>  
                                    <div class="input"> <input type="url" value={linkImagem} onChange={e => setLinkImagem(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input-longo2">
                                    <div class="number-student"> Descrição: </div>  
                                    <div class="input2"> < input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} /> </div> 
                                    <div class="button-create"> <button onClick={inserir} > { idAlterando == 0 ? "Cadastrar" : "Alterar" } </button> </div>
                                </div>
                                
                            </div>
                            

                            

                            <div class="input-right">
                                <div class="agp-input1">
                                    <div class="corse-student"> Preço DE: </div>  
                                    <div class="inputM"> <input type="text" value={preco_de} onChange={e => setPreco_de(e.target.value)} /> </div>  
                                </div>
                                <div class="agp-input2">
                                    <div class="class-student1"> Preço POR: </div>  
                                    <div class="input"> <input  type="text" value={preco_por} onChange={e => setPreco_por(e.target.value)} /> </div> 
                                </div>
                                <div class="agp-input3">
                                    <div class="number-student1"> Estoque:</div>  
                                    <div class="input"> <input type="text" value={estoque} onChange={e => setEstoque(e.target.value)} /> </div> 
                                </div>
                               
                            </div>
                                                                                    
                        </div>
                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Produtos Cadastrados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>

                                {produto.map((item, i) =>
                                    
                                    <tr className={i % 2 == 0 ? "linha-alternada" : ""}>
                                    <td title={item.nm_produto} > <img src={item.img_produto != null && item.nm_produto.length >= 25
                                        ? item.nm_produto.substr(0, 25) + '...'
                                        : item.img_produto} alt="" style={{width:'40px', height:'40px'}}/> </td>
                                    <td> {item.id_produto} </td>
                                    <td title={ item.nm_produto != null && item.nm_produto.length > 12 ? item.nm_produto : null }> { item.nm_produto != null && item.nm_produto.length >= 15 ? item.nm_produto.substr(0, 15) + '...' : item.nm_produto } </td>
                                    <td title={ item.ds_categoria != null && item.ds_categoria.length > 10 ? item.ds_categoria : null }> { item.ds_categoria != null && item.ds_categoria.length >= 10 ? item.ds_categoria.substr(0, 10) + '...' : item.ds_categoria } </td>
                                    <td> {item.vl_preco_por} </td>
                                    <td> {item.qtd_estoque} </td>
                                    <td className="coluna-acao"> <button onClick={ () => editar(item) } > <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                    <td className="coluna-acao"> <button onClick={ () => remover(item.id_produto)} > <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                </tr>

                              )}
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
