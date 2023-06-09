import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";

export function Livros() {

    const [livros, setLivros] = useState(null);

        useEffect(() => {
            //buscar informacoes do banco
            getLivros().then(busca => {
                setLivros(busca);
            })
        },[]);

        //funcao para deletar o registro do livro.
        function onDeleteLivro(id, titulo) {
            const deletar = window.confirm(`Tem certeza que deseja excluir ${titulo}?`);
            if(deletar) {
                deleteLivro(id).then(() => {
                    toast.success(`${titulo} apagado com sucesso"`, {duration: 3000, position: "top-center"});
                    // traz a tabela atualizada apos deletar o registro
                    getLivros().then(busca => {
                        setLivros(busca);
                })
            })
        }
    } 

        

    return (
        <div className="livros">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Livros</h1>
                    <Button as={Link} to="/livros/adicionar" variant="success">Adicionar</Button>
                </div>
                <hr/>
                {/* a linha baixo serve para apresentar o "Loader" enqt a tabela de livros nao aparece. */}
                {livros === null ? <Loader /> : (
                
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>ISBN</th>
                        <th>Imagem</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map(livro => {
                        return (
                            <tr key={livro.id}>
                            <td>{livro.titulo}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.categoria}</td>
                            <td>{livro.isbn}</td>
                            <td><img src={livro.urlcapa} alt={livro.titulo}></img></td>
                            <td>
                                <Button as={Link} to={`/livros/editar/${livro.id}`} variant="warning" size="sm" className="me-2">
                                <i className="bi bi-pencil-square" title="editar"></i>
                                </Button>

                                <Button variant="danger" size="sm" onClick={() => onDeleteLivro(livro.id, livro.titulo)}>  {/* colocar uma funcar q sera executada no onClick, precisa da arrow function. ou criar a funcao arrow la em cima e chamar ela diretamente no onClick */}
                                <i className="bi bi-trash3-fill" title="deletar"></i>
                                </Button>
                            </td>
                        </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
                )}
        </Container>

        </div>
    )
}