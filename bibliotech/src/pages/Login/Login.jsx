// tela sem a NavBar
import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../components/contexts/AuthContext";
import { loginEmailSenha, loginGoogle } from "../../firebase/auth";

export function Login() {
    const { register, handleSubmit,formState: { errors }} = useForm();

    const navigate = useNavigate();


    function onSubmit(data) {
        const { email, senha } = data;
        loginEmailSenha(email, senha).then((user) => {
            toast.success(`Logado como ${user.email}`, {
                position: "top-center", duration: 3000,
            });
            navigate("/");
        }).catch((erro) => {
            toast.error(`Erro inesperado. Cód: ${erro.code}`, {position:"top-center", duration: 3000});
        });
    }

    function onLoginGoogle() {
        loginGoogle().then((user) => {
            toast.success(`Olá de novo, ${user.displayName}`, {position:"top-center", duration: 3000});
            navigate=("/");
        })
        .catch((erro) => {
            toast.error(`Erro inesperado. Cód: ${erro.code}`, {position:"top-center", duration: 3000,});
        });
    }

    const usuarioLogado = useContext(AuthContext);

    // se tiver dados no obj, está logado, se nao, volta pra pag de login
    if(usuarioLogado !== null) {
        return <Navigate to="/" />;
    }

    return (
        <Container fluid className="my-5">
            <p className="text-center">
                <img src={loginImg} width="256" alt="Logo" />
            </p>
            <h4>Bem-vindo(a) de volta!</h4>
            <br/>
            <p className="text-muted">
                Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
            </p>
            <hr />
            <Button className="mb-3" variant="primary" onClick={onLoginGoogle} >
                <img src={googleIcon} width="32" alt="Google icon" /> Entrar com o
                Google
            </Button>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Seu email"
                        className={errors.email ? "is-invalid" : ""}
                        {...register("email", { required: "Email é obrigatório" })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.email?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="senha">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Sua senha"
                        className={errors.senha ? "is-invalid" : ""}
                        {...register("senha", { required: "Senha é obrigatória" })}
                    />
                    <Form.Text className="invalid-feedback">
                        {errors.senha?.message}
                    </Form.Text>
                </Form.Group>
                <Button type="submit" variant="success">
                    Entrar
                </Button>
            </Form>
        </Container>
    );
}