const form = document.getElementById('novoItem');
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem("itens")) || []; // transformando a string em objeto

itens.forEach((elemento) => {
    criaElemento(elemento); 
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const elementoExiste = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(elementoExiste){
        itemAtual.id = elementoExiste.id;
        
        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === elementoExiste.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[length -2]).id + 1 : 0;
        
        criaElemento(itemAtual);
        
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens)); // transformando o objeto em string para o localStorage
});

function criaElemento(item){
    const novoItem = document.createElement('li');
    
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    
    numeroItem.innerHTML = item.quantidade;

    numeroItem.dataset.id = item.id;
    
    novoItem.appendChild(numeroItem);
    
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);

}

function atualizaElemento(item){
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const botao = document.createElement("button");
    botao.innerText = "X";
    botao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    })

    return botao;
}

function deletaElemento(tag, id){
    tag.remove();
    console.log(id)
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens));
}