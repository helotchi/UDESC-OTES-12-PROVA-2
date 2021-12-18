// Variáveis
const formRequisicoes = document.querySelector("#requisicao");
const buttonRequisicoes = document.querySelector("#button-requisicoes");
const buttonManutencoes = document.querySelector("#button-manutencoes");
const buttonPendentes = document.querySelector("#button-pendentes");
const buttonSistemas = document.querySelector("#button-sistemas");

// Funções 
(async function () {
    const requisicoes = await fetch("http://localhost:3000/requisicoes?situacao=COM&situacao=AP")
        .then(response => response.json())
        .then(dados => dados)
    generateTable(requisicoes, document.getElementById("table-requisicoes"))
})();

(async function () {
    const manutencoes = await fetch("http://localhost:3000/requisicoes?situacao=EA")
        .then(response => response.json())
        .then(dados => dados)
    generateTable(manutencoes, document.getElementById("table-manutencoes"))
})();

(async function () {
    const pendentes = await fetch("http://localhost:3000/requisicoes?situacao=EA&situacao=AP")
        .then(response => response.json())
        .then(dados => dados)
    generateTable(pendentes, document.getElementById("table-pendentes"))
})();

(async function () {
    const sistemasEstoque = await fetch("http://localhost:3000/requisicoes?sistema=Estoque")
        .then(response => response.json())
        .then(dados => dados)
    generateTable(sistemasEstoque, document.getElementById("sistema-estoque"))
})();

(async function () {
    const sistemasVendas = await fetch("http://localhost:3000/requisicoes?sistema=Vendas")
        .then(response => response.json())
        .then(dados => dados)
    generateTable(sistemasVendas, document.getElementById("sistema-vendas"))
})();

(async function () {
    const sistemasCompras = await fetch("http://localhost:3000/requisicoes?sistema=Compras")
        .then(response => response.json())
        .then(dados => dados)
    generateTable(sistemasCompras, document.getElementById("sistema-compras"))
})();

function postMethod (form) {
    const requisitante = document.querySelector("#nome-requisitante").value;
    const date = document.querySelector("#data-requisicao").value;
    const sistema = document.querySelector("#sistema-afetado").value;
    form.preventDefault();
    fetch("http://localhost:3000/requisicoes", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            "requisitante": requisitante,
            "data": date,
            "sistema": sistema,
            "situacao": "EA"
        })
    })
        .then(response => response.json())
        .then(data => {console.log(data)})
} 

function generateTable(dados, table){
    for (let i = 0; i < dados.length; i += 1){
        let dadosLinha = "";
        for (dado in dados[i]){
            dadosLinha += `<td>${dados[i][dado]}</td>`;
        }

        if (table.id == "table-requisicoes" || table.id == "table-manutencoes"){
            dadosLinha += `<td><a id="button-deletar" href="#">Deletar</a>`;
            if (dados[i].situacao == "EA") {
                dadosLinha += `<a id="button-concluir" href="#">Concluir</a>`;
            } else if (dados[i].situacao == "AP") {
                dadosLinha += `<a id="button-aceitar" href="#">Aceitar</a><a id="button-recusar" href="#">Recusar</a>`;
            }
            dadosLinha += `</td>`;
            }
        
        table.innerHTML += `<tr>${dadosLinha}</tr>`;
    }
}

function pageRequisicoes() {
    document.getElementById("requisicoes").hidden = false;
    document.getElementById("manutencoes").hidden = true;
    document.getElementById("pendentes").hidden = true;
    document.getElementById("sistemas").hidden = true;
} 

function pageManutencoes() {
    document.getElementById("manutencoes").hidden = false;
    document.getElementById("requisicoes").hidden = true;
    document.getElementById("pendentes").hidden = true;
    document.getElementById("sistemas").hidden = true;
}

function pagePendentes() {
    document.getElementById("pendentes").hidden = false;
    document.getElementById("requisicoes").hidden = true;
    document.getElementById("manutencoes").hidden = true;
    document.getElementById("sistemas").hidden = true;
} 

function pageSistemas() {
    document.getElementById("sistemas").hidden = false;
    document.getElementById("manutencoes").hidden = true;
    document.getElementById("requisicoes").hidden = true;
    document.getElementById("pendentes").hidden = true;    
}


// Chamada funções
formRequisicoes.addEventListener("submit", postMethod);
buttonRequisicoes.addEventListener("click", pageRequisicoes);
buttonManutencoes.addEventListener("click", pageManutencoes);
buttonPendentes.addEventListener("click", pagePendentes);
buttonSistemas.addEventListener("click", pageSistemas);

