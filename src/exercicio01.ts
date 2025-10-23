/*

Crie uma classe que modele um(a) aluno(a) de academia:

    - Atributos: Nome, data de nascimento, peso e altura.
    - Métodos: Calcula idade.

*/

import * as readlineSync from 'readline-sync';

function principal() {
    console.log("--- Coletando informações pessoais ---");
    const nomeDeUsuario: string = readlineSync.question('Qual o seu nome? ');
    const dataDeNascimentoInformada: string = readlineSync.question('Qual a sua data de nascimento (DD-MM-YYYY)? ');
    const peso: string = readlineSync.question('Qual o seu peso? ');
    const altura: string = readlineSync.question('Qual a sua altura? ');
    const usuario = new Pessoa(nomeDeUsuario, dataDeNascimentoInformada, peso, altura);
    const idadeCalculada: number | null = usuario.calcularIdade();

    if (idadeCalculada === null) {
        console.log(`Olá, ${usuario.nome}!`);
        console.log("Erro: Formato da data de nascimento inválido (deve ser DD-MM-YYYY) ou data futura.");
    } else {
        console.log(`Olá, ${usuario.nome}!`);
        console.log(`Com base na sua data de nascimento informada (${usuario.dataDeNascimentoString}), você tem ${idadeCalculada} anos.`);
    }
}

class Pessoa {
    public nome: string;
    public dataDeNascimentoString: string;
    public peso: string;
    public altura: string;

    /**
     * @param nome Nome da pessoa.
     * @param dataDeNascimentoString Data de nascimento no formato DD-MM-YYYY.
     */
    constructor(nome: string, dataDeNascimentoString: string, peso: string, altura: string) {
        this.nome = nome;
        this.dataDeNascimentoString = dataDeNascimentoString;
        this.peso = peso;
        this.altura = altura;
    }

    /**
     * Converte a string DD-MM-YYYY em um objeto Date.
     * @returns Um objeto Date válido, ou nulo se a conversão falhar ou a data for inválida (por ex., 30/02).
     */
     private converteData(): Date | null {
        const partes = this.dataDeNascimentoString.split('-');
        if (partes.length !== 3) {
            return null;
        }
        const dia = parseInt(partes[0]!, 10);
        const mes = parseInt(partes[1]!, 10);
        const ano = parseInt(partes[2]!, 10);
        if (isNaN(dia) || isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12) {
            return null;
        }
        const dataDeNascimento = new Date(ano, mes - 1, dia);
        if (dataDeNascimento.getFullYear() !== ano || dataDeNascimento.getMonth() !== mes - 1 || dataDeNascimento.getDate() !== dia) {
             return null;
        }
        return dataDeNascimento;
    }

    /**
     * Método público para calcular a idade da pessoa em anos.
     * @returns A idade calculada em anos, ou nulo se a data de nascimento for inválida ou está no futuro.
     */
    public calcularIdade(): number | null {
        const dataDeNascimento = this.converteData();
        const hoje = new Date();
        if (dataDeNascimento === null) {
            return null;
        }
        if (dataDeNascimento.getTime() > hoje.getTime()) {
            return null;
        }
        let idade = hoje.getFullYear() - dataDeNascimento.getFullYear();
        const diferencaMes = hoje.getMonth() - dataDeNascimento.getMonth();
        if (diferencaMes < 0 || (diferencaMes === 0 && hoje.getDate() < dataDeNascimento.getDate())) {
            idade--;
        }

        return idade;
    }
}

principal();