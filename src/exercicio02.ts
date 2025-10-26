/*

Crie uma classe que modele uma avaliação física de academia:

    - Atributos: Id matricula, data da matrícula, aluno e avaliações físicas.
    - Informações do aluno, informações da última avaliação e informações de uma avaliação qualquer.

*/

import * as readlineSync from 'readline-sync';

function principal() {
    console.log("--- Coletando informações pessoais ---");
    const id: string = readlineSync.question('Qual a Id da matrícula? ');
    const dataDaMatriculaInformada: string = readlineSync.question('Qual a data da matrícula (DD-MM-YYYY)? ');
    const nomeDeUsuario: string = readlineSync.question('Qual o nome do(a) aluno(a)? ');

    const anamnese: string[] = [];

    const historicoPessoal: string = readlineSync.question('Houve alguma alteração no estado de saúde nos últimos 3 meses? ');
    anamnese.push(`Alteração de saúde: ${historicoPessoal}.`);
    const queixas: string = readlineSync.question('Houve lesões, dores musculares ou articulares nos últimos 3 meses? ');
    anamnese.push(`Queixas: ${queixas}.`);
    const historicoFamiliar: string = readlineSync.question('Há histórico familiar de doenças (cardíacas, diabetes, etc.)? ');
    anamnese.push(`Histórico familiar de doenças: ${historicoFamiliar}.`);
    const rotinaDeSono: string = readlineSync.question('Como está a rotina de sono (qualidade e quantidade de horas)? ');
    anamnese.push(`Rotina de sono: ${rotinaDeSono}.`);
    const rotinaAlimentar: string = readlineSync.question('Como está a rotina alimentar? ');
    anamnese.push(`Rotina alimentar: ${rotinaAlimentar}.`);
    const rotinaDeTreino: string = readlineSync.question('Conseguiu manter a rotina de treino nos últimos 3 meses? ');
    anamnese.push(`Rotina de treino: ${rotinaDeTreino}.`);

    const avaliacaoCorporal: string[] = [];

    const pesoAtualString: string = readlineSync.question('Qual o peso atual? ');
    const alturaString: string = readlineSync.question('Qual a altura? ');
    const pesoAtual: number = parseFloat(pesoAtualString);
    const altura: number = parseFloat(alturaString);
    if (isNaN(pesoAtual) || pesoAtual < 0 || pesoAtual > 635 || isNaN(altura) || altura < 0 || altura > 3.0) {
        avaliacaoCorporal.push(`Peso atual: valor informado inválido.`);
        avaliacaoCorporal.push(`Altura: valor informado inválido.`);
    } else {
        avaliacaoCorporal.push(`Peso atual: ${pesoAtualString} kg.`);
        avaliacaoCorporal.push(`Altura: ${alturaString} m.`);
        const imc: number = pesoAtual / (altura * altura);
        avaliacaoCorporal.push(`IMC: ${imc}.`);
    }
    const medidasCorporais: string = readlineSync.question('Quais as medidas (circunferências) corporais? ');
    avaliacaoCorporal.push(`Medidas corporais: ${medidasCorporais}.`);
    const percentualDeGordura: string = readlineSync.question('Qual o percentual de gordura? ');
    avaliacaoCorporal.push(`Percentual de gordura: ${percentualDeGordura}.`);

    const testesDeAptidao: string[] = [];

    const forcaEResistenciaMuscular: string = readlineSync.question('Qual o resultado do teste de força e resistência muscular? ');
    testesDeAptidao.push(`Teste de força e resistência muscular: ${forcaEResistenciaMuscular}.`);
    const flexibilidade: string = readlineSync.question('Qual o resultado do teste de flexibilidade? ');
    testesDeAptidao.push(`Teste de flexibilidade: ${flexibilidade}.`);
    const avaliacaoPostural: string = readlineSync.question('Qual o resultado da avaliação postural? ');
    testesDeAptidao.push(`Avaliação postural: ${avaliacaoPostural}.`);
    const aptidaoCardiorrespiratoria: string = readlineSync.question('Qual o resultado do teste de aptidão cardiorrespiratória? ');
    testesDeAptidao.push(`Teste de aptidão cardiorrespiratória: ${aptidaoCardiorrespiratoria}.`);

    const avaliacaoFisica: string[][] = [
        anamnese,
        avaliacaoCorporal,
        testesDeAptidao
    ];
    
    const usuario = new Pessoa(id, dataDaMatriculaInformada, nomeDeUsuario, avaliacaoFisica);
    console.log("--- Informações referentes à ultima avaliação ---");
    console.log(avaliacaoFisica);
    const tempoDeAtividade = usuario.verificarNovaAvaliacao();
    if (tempoDeAtividade === null) {
        console.log("Erro: Formato da data de matrícula inválido (deve ser DD-MM-YYYY) ou data futura.");
    } else if (tempoDeAtividade >= 3) {
        console.log("Já faz pelo menos 3 meses desde o início das atividades. Recomenda-se realizar nova avaliação.");
    }
};

class Pessoa {
    public id: string;
    public dataDaMatriculaString: string;
    public nome: string;
    public avaliacaoFisica: string[][];

    /**
     * @param id Id da matrícula.
     * @param dataDaMatriculaString Data da matrícula no formato DD-MM-YYYY.
     * @param nome Nome da pessoa.
     * @param avaliacaoFisica Informações da avaliação física.
     */
    constructor(id: string, dataDaMatriculaString: string, nome: string, avaliacaoFisica: string[][]) {
        this.id = id;
        this.dataDaMatriculaString = dataDaMatriculaString;
        this.nome = nome;
        this.avaliacaoFisica = avaliacaoFisica;
    }

    /**
     * Converte a string DD-MM-YYYY em um objeto Date.
     * @returns Um objeto Date válido, ou nulo se a conversão falhar ou a data for inválida (por ex., 30/02).
     */
     private converteData(): Date | null {
        const partes = this.dataDaMatriculaString.split('-');
        if (partes.length !== 3) {
            return null;
        }
        const dia = parseInt(partes[0]!, 10);
        const mes = parseInt(partes[1]!, 10);
        const ano = parseInt(partes[2]!, 10);
        if (isNaN(dia) || isNaN(mes) || isNaN(ano) || mes < 1 || mes > 12) {
            return null;
        }
        const dataDaMatricula = new Date(ano, mes - 1, dia);
        if (dataDaMatricula.getFullYear() !== ano || dataDaMatricula.getMonth() !== mes - 1 || dataDaMatricula.getDate() !== dia) {
             return null;
        }
        return dataDaMatricula;
    }

    /**
     * Método público para calcular a idade da pessoa em anos.
     * @returns A idade calculada em anos, ou nulo se a data de nascimento for inválida ou está no futuro.
     */
    public verificarNovaAvaliacao(): number | null {
        const dataDaMatricula = this.converteData();
        const hoje = new Date();
        if (dataDaMatricula === null) {
            return null;
        }
        if (dataDaMatricula.getTime() > hoje.getTime()) {
            return null;
        }
        const diferencaAno = hoje.getFullYear() - dataDaMatricula.getFullYear();
        const diferencaMes = hoje.getMonth() - dataDaMatricula.getMonth();

        return diferencaAno * 12 + diferencaMes;
    }
}

principal();