// 1) Montar uma calculadora de IMC (campo peso e campo altura), mostrar o resultado do cálculo abaixo dos campos ao clicar em calcular.

import { useState } from "react";
import { generoImc } from "../Data/generoImc";
import "./CalcImc.css";

export function CalcImc() {
    const [imc, setImc] = useState();
    const [peso, setPeso] = useState();
    const [altura, setAltura] = useState();
    // const [genero, setGenero]

    // FORMULA IMC = peso / altura²

    function obterPeso(e) {
        const input = e.target;
        const valor = input.value;
        setPeso(valor);
    }

    function obterAltura(e) {
        const input = e.target;
        const valor = input.value;
        setAltura(valor);
    }

    function calculaImc() {
        const pesoFloat = parseFloat(peso.replace(',','.'));
        const alturaFloat = parseFloat(altura.replace(',','.'));
        const valor = pesoFloat / (alturaFloat ** 2);
        setImc(valor.toFixed(2));
    }

function limpar() {
    setPeso("");
    setAltura("");
    setImc("");
}

// function gender() {

// }


    return (
        <>
            <div className="calculadoraIMC">
            <h2>Calcule seu IMC aqui:</h2>
                <input type="text" placeholder="Digite seu peso (Kg)" onChange={obterPeso} value={peso}></input>
                <input type="text" placeholder="Digite sua altura" onChange={obterAltura} value={altura}></input>
                <br />
                <strong>Seu peso é: {peso} Kg</strong>
                <br />
                <strong>Sua altura é: {altura}m</strong>
                <br />
                <select>
                <option value="female" onClick={gender}>feminino</option>
                <option value="male" onClick={gender}>masculino</option>
                </select>
                <button onClick={calculaImc}>Calcular</button>
                <button onClick={limpar}>Limpar </button>
                <br />
                <strong id="result">Com esses dados, seu IMC é: {imc}</strong>
            </div>
            
        </>
    );
}