//Captura de dados
const nome = document.querySelector('#nome-var')//Captura o nome da variavel
const dados = document.getElementById("dados")//captura os dados digitados
const resultado = document.getElementById("button")//captura quando o botão for clicado
const tabela = document.getElementById("tabelasvariaveis")// captura a tabela principal para podermos editar via java script
const tipo_variavel = document.getElementById("tipo de variavel")//informa o tipo de variavel
const ordem = document.getElementById("ordem_dados")// informa a ordem dos dados
const pontos_centrais = document.getElementById('tabela_medias')//captura a tabela de medidas centrais para podermos editar via java script
const amostra = document.getElementById('Amostra')//informa se é amostra
const populacao = document.getElementById('População')// informa se é população
const desvio = document.getElementById('varianca_desvio')// captura a tabela de variancia e desvio padrão para podermos editar via java script
let vetor_final2 = []//vetor com os dados usado em quase todas as funções
let total = 0//inicia o total de itens dos dados
let tira_espaco = /\s*;\s*/; // Tira os espaços entre os ";"
let vetor_continuo = []//vetor que utilizamos quando trabalhamos com o tipo de variavel continuo

function botaoClique() {
    // CRIANDO O VETOR para auxiliar a transformar em vetor os dados           
    let dados_valores = dados.value// pega os dados com seu valor 
    let vetor1 = dados_valores.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetor_final = vetor1.filter(x => x.trim()) // Remove itens vazios do vetor
    // Coloca em ordem
    let conta_numero = 0// conta quantas variaveis são do tipo number
    let conta_string = 0// conta quantas variaveis são do tipo string
    let organizar_string = []// ajuda a organizar as strings em ordem alfabetica
    let organizar_numero = []// ajuda a organizar os numeros em ordem crescente
    //faz as tepetições para organizar o vetor e conta quanto tem de cada tipo de variavel
    for (conteudo of vetor_final) {
        let descubra = parseFloat(conteudo)

        if (isNaN(descubra)) {
            conta_string++
            organizar_string.push(conteudo)
        } else {
            conta_numero++
            organizar_numero.push(conteudo)
        }

    }
    //se os dados tiver apenas numeros ele organiza aqui
    if (conta_string == 0) {
        vetor_final.sort(function (a, b) {
            return a - b;
        });
        vetor_final
    }
    //se os dados tiverm tanto numeros quanto strings ira organizar aqui
    else if (conta_string > 0 && conta_numero > 0) {
        organizar_numero.sort(function (a, b) {
            return a - b;
        });
        organizar_numero
        quickSort(organizar_string) // USANDO ALGORITMO DE ORDENAÇÃO
        //organizar_string.sort()
        let aux = vetor_final.length
        vetor_final.splice(0, aux)
        for (dado of organizar_string) {
            vetor_final.push(dado)
        }
        for (dado of organizar_numero) {
            vetor_final.push(dado)
        }
    }
    //se os dados tiver apenas stings ele organiza aqui 
    else {
        quickSort(vetor_final)  // USANDO ALGORITMO DE ORDENAÇÃO
    }
    // valida dados
    // estes lets ajudam na validação 
    let podeseguir = true
    let ordem_dados = ordem.value
    let vetor_organizador = ordem_dados.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetor_ordem = vetor_organizador.filter(x => x.trim()) // Remove itens vazios do vetor

    //Verfica se o nome das variaveis foi preenchido
    if (nome.value.trim() == '') {
        Swal.fire({
            icon: "error",
            title: "O nome da variável deve ser preenchido!", 
            text: "",
            didClose: () => {
            nome.focus()} // Coloca o cursor no elemento especificado
        }) 
        podeseguir = false
    }
    //Verifica se os dados foram preenchidos 
    else if (conta_numero == 0 && conta_string == 0) {
        Swal.fire({
            icon: "error",
            title: "Insira os dados!", 
            text: "",
            didClose: () => {
            dados.focus()} // Coloca o cursor no elemento especificado
        }) 
        podeseguir = false
    }
    //verifica se escolheu o tipo de variavel 
    else if (tipo_variavel.selectedIndex == 0) {
        Swal.fire({
            icon: "error",
            title: "Escolha o tipo de dado.", 
            text: "",
            didClose: () => {
            tipo_variavel.focus()} // Coloca o cursor no elemento especificado
        })
        podeseguir = false

    }
    //verifica caso seja escolhido o tipo de variavel qualitativa ordinal a ordem foi preenchida
    else if (tipo_variavel.selectedIndex == 2 && vetor_ordem[0] === undefined) {
        Swal.fire({
            icon: "error",
            title: "Insira a ordem desejada.", 
            text: "",
            didClose: () => {
            ordem.focus()} // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    }
    //verifica se caso escolhido o tipo de variavel quantitativa se ela não possui strings  
    else if ((tipo_variavel.selectedIndex == 3 || tipo_variavel.selectedIndex == 4) && conta_string > 0) {
        Swal.fire({
            icon: "error",
            title: "Dados ou seleção do tipo de dados errados!", 
            text: "",
            didClose: () => {
            dados.focus()} // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    }
    // verifica se preencheu a ordem sem ser o tipo de variavel qualitativa ordinal 
     else if (vetor_ordem[0] != undefined && tipo_variavel.selectedIndex != 2) {
        Swal.fire({
            icon: "error",
            title: "Selecione o tipo de variavel correta ou apague a ordem.", 
            text: "",
            didClose: () => {
            tipo_variavel.focus()} // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    }
    //verifica se o item dos dados contem um exemplo na ordem 
    else if (tipo_variavel.selectedIndex == 2) {
        for (dado of vetor_final) {
            let tem = vetor_ordem.indexOf(dado)
            if (tem < 0) {
                Swal.fire({
                    icon: "error",
                    title: "Item não consta na ordem: " + dado, 
                    text: "",
                    didClose: () => {
                    ordem.focus()} // Coloca o cursor no elemento especificado
                })
                podeseguir = false
                break
            }
        }
        for (falto of vetor_ordem) {
            let tems = vetor_final.indexOf(falto)

            if (tems < 0) {
                Swal.fire({
                    icon: "error",
                    title: "Item incluído na ordem desejada não existe." , 
                    text: "O item é: " + falto,
                    didClose: () => {
                    ordem.focus()} // Coloca o cursor no elemento especificado
                })
                podeseguir = false
                break
            }

        }

    }

    // se não faltar dado o programa continua 
    if (podeseguir) {

        // Contando as ocorrências de cada item no vetor 

        for (let i = 0; i < vetor_final.length; i++) {
            let valido = true

            if (vetor_final[i] == vetor_final[i - 1]) {
                valido = false
            }

            if (valido) {
                let indices = []
                let item = vetor_final[i]
                let idx = vetor_final.indexOf(item)
                //conta quanto tem de cada item
                while (idx != -1) {
                    indices.push(idx);
                    idx = vetor_final.indexOf(item, idx + 1);
                }

                total += parseInt(indices.length)// conta o total de itens

                inserir_obj(item, indices.length)//chama a função que coloca dentreo de um objeto os dados e joga pro vetorfinal2 
            }
        }
        //ordena o vetor_final2 na ordem que o usuario informou se a variavel for do tipo ordinal
        if (tipo_variavel.selectedIndex == 2) {
            let vetor_aux = []//ajuda na ordenação

            
            for (dado of vetor_ordem) {
                // USANDO ALGORITMO DE BUSCA
                let a = buscaSequencial(vetor_final2, dado, (obj, valor) => obj['nome'] === valor) 
                let help = vetor_final2[a]
                vetor_aux.push(help)
                vetor_final2.splice(a, 1)
            }
            vetor_final2 = vetor_aux


        }
        // Quando é o caso de quantitativo continuo
        if (tipo_variavel.selectedIndex == 4) {
            //primeiro número da sequencia
            let inicio_classe = vetor_final2[0]['nome']
            //calcula a amplitude do dados 
            let aux = vetor_final2.length - 1
            let amplitude_total = vetor_final2[aux]['nome'] - vetor_final2[0]['nome']
            let k = (total) ** (1 / 2)

            //possiveis numeros de linhas
            let nl1 = Math.floor(k)
            let nl2 = nl1 + 1
            let nl3 = nl1 - 1
            let x = true
            let aux3 = amplitude_total + 1
            let intervalo_de_classe
            let numero_de_linhas
            //testando possiveis número de linhas
            while (x == true) {
                if (aux3 % nl1 == 0) {
                    numero_de_linhas = nl1
                    x = false
                    intervalo_de_classe = aux3 / nl1
                } else if (aux3 % nl2 == 0) {
                    numero_de_linhas = nl2
                    x = false
                    intervalo_de_classe = aux3 / nl2
                } else if (aux3 % nl3 == 0) {
                    numero_de_linhas = nl3
                    x = false
                    intervalo_de_classe = aux3 / nl3
                } else {
                    aux3 += 1
                }
            }
            //organizando os dados dessa categoria 
            let ajuda = parseFloat(inicio_classe)//onde começa a primeira classe
            let contador = 0 // 
            let aux2 = 0
            let aux4 = numero_de_linhas - 1// quantas vezes o for ira executar
            // cria as classes 
            for (let i = 0; i < numero_de_linhas; i++) {
                let ajuda_antiga = ajuda// qual é o inicio da classe
                ajuda += intervalo_de_classe,// o fim da classe
                    contador = 0

                for (let q = 0; q < vetor_final2.length; q++) {
                    if (aux4 != i) {
                        if ((parseFloat(vetor_final2[q]['nome']) < ajuda)) {
                            contador = contador + vetor_final2[q]['valor']
                        } else if (vetor_final2[q]['nome'] >= ajuda && aux2 == 0) {
                            let string = `${vetor_final2[0]['nome']} |-------${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limite_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            aux2++
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, q)
                            break
                        } else if (vetor_final2[q]['nome'] >= ajuda && aux2 > 0) {
                            let string = `${ajuda_antiga}|------- ${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limite_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            aux2++
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, q)
                            break
                        }
                    } else {

                        for (w = 0; w <= vetor_final2.length; w++)
                            if (w < vetor_final2.length) {
                                contador = contador + vetor_final2[w]['valor']
                            }
                        else {
                            let string = `${ajuda_antiga}|------- ${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limite_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, w)
                            break
                        }
                    }
                }

            }
            vetor_final2 = vetor_continuo

        }
        //calculando as frequencias chamando uma função a parte 
        for (let i = 0; i < vetor_final2.length; i++) {
            frequencias(i)
        }

        // cria o cabeçalho da tabela
        let linha_nomes = document.createElement('tr')
        linha_nomes.id = 'cabecalho'
        tabela.appendChild(linha_nomes)
        //Nome da Variável
        let Nome_da_Variavel = document.createElement('td')
        Nome_da_Variavel.id = 'Nome_da_Variavel'
        Nome_da_Variavel.innerText = nome.value
        linha_nomes.appendChild(Nome_da_Variavel)
        //Frequência Simples (fi)
        let Frequencia_Simples = document.createElement('td')
        Frequencia_Simples.id = 'Frequencia_Simples'
        Frequencia_Simples.innerText = "Frequência Simples (fi)"
        linha_nomes.appendChild(Frequencia_Simples)
        //Frequencia Relativa(Fr%)
        let Frequencia_Relativa = document.createElement('td')
        Frequencia_Relativa.id = 'Frequencia_Relativa'
        Frequencia_Relativa.innerText = "Frequencia Relativa(Fr%)"
        linha_nomes.appendChild(Frequencia_Relativa)
        //Frequencia Acumulativa
        let Frequencia_Acumulativa = document.createElement('td')
        Frequencia_Acumulativa.id = 'Frequencia_Acumulativa'
        Frequencia_Acumulativa.innerText = "Frequencia Acumulativa"
        linha_nomes.appendChild(Frequencia_Acumulativa)
        //Frequencia Relativa Acumulativa(%)
        let Frequencia_Relativa_Acumulativa = document.createElement('td')
        Frequencia_Relativa_Acumulativa.id = 'Frequencia_Relativa_Acumulativa'
        Frequencia_Relativa_Acumulativa.innerText = "Frequencia Relativa Acumulativa(%)"
        linha_nomes.appendChild(Frequencia_Relativa_Acumulativa)



        for (let i = 0; i < vetor_final2.length; i++) {
            //CRIAR LINHA NA TABELA
            let linha = document.createElement('tr')
            tabela.appendChild(linha)
            //CRIAR CÉLULA COM O NOME DO PRIMEIRO ITEM
            let cel1 = document.createElement('td')
            cel1.id = 'celula1'
            cel1.innerText = vetor_final2[i]['nome']
            linha.appendChild(cel1)
            //CRIAR CÉLULA COM A QUANTIDADE ENCONTRADA
            let cel2 = document.createElement('td')
            cel2.id = 'celula2'
            cel2.innerText = vetor_final2[i]['valor']
            linha.appendChild(cel2)
            //CRIAR CÉLULA COM A Frequencia Relativa
            let cel3 = document.createElement('td')
            cel3.id = 'celula3'
            cel3.innerText = vetor_final2[i]['Frequencia relativa'].toFixed(2)
            linha.appendChild(cel3)
            //CRIAR CÉLULA COM A Frequencia Acumulativa
            let cel4 = document.createElement('td')
            cel4.id = 'celula4'
            cel4.innerText = vetor_final2[i]['Frequencia acumulada']
            linha.appendChild(cel4)
            //CRIAR CÉLULA COM A Frequencia relativa Acumulativa
            let cel5 = document.createElement('td')
            cel5.id = 'celula5'
            cel5.innerText = vetor_final2[i]['Frequencia relativa acumulada'].toFixed(2)
            linha.appendChild(cel5)
        }
        //total
        //CRIAR LINHA NA TABELA
        let linha = document.createElement('tr')
        tabela.appendChild(linha)
        //CRIAR CÉLULA COM O NOME DO PRIMEIRO ITEM
        let cel6 = document.createElement('td')
        cel6.id = 'total'
        cel6.innerText = 'TOTAL'
        linha.appendChild(cel6)
        let cel7 = document.createElement('td')
        cel7.id = 'total'
        cel7.innerText = total
        linha.appendChild(cel7)
        let cel8 = document.createElement('td')
        linha.appendChild(cel8)
        let cel9 = document.createElement('td')
        linha.appendChild(cel9)
        let cel10 = document.createElement('td')
        linha.appendChild(cel10)

        grafico(vetor_final2, tipo_variavel.selectedIndex, nome.value)//cria o grafico usando uma função
        tendencia_central(vetor_final2, tipo_variavel.selectedIndex, total)//calcula as tendencias centrais
        const mostrar = document.getElementById('medida_separatriz')
        mostrar.style.visibility= 'visible'//('visibility visible')// mostra as mediadas separatrizes
        const mostrar2 = document.getElementById('canvas')
        mostrar2.style.visibility= 'visible'//('visibility visible') // torna o grafico visivel

        const show = document.getElementById('aside-grafico')
        show.style.display = 'block' // Mostrar aside do gráfico
        const show2 = document.getElementById('section-tabelas')
        show2.style.display= 'block' // Mostrar section tabelas
        const show3 = document.getElementById('to-top')
        show3.style.display= 'flex' // Mostar botão de roalr para cima

       
        // Descer a página após clicar no botão
        $('html, body').animate({ scrollTop: 2000 }, 0);
    }    
}


resultado.addEventListener('click', botaoClique)// informa quando o botão calcular for acionado

// ALGORITMO DE BUSCA
function buscaSequencial(lista, valorBusca, fnComp) {
    for (let i = 0; i < lista.length; i++) {
        //Encontrou o que está buscando: retorna a posição
        //em que foi encontrado
        if (fnComp(lista[i], valorBusca)) return i
    }
    return -1 // valorBusca não foi encontrado em lista
}

// ALGORITMO DE ORDENAÇÃO
function quickSort(vetor, inicio = 0, fim = vetor.length - 1) {
    if(fim > inicio) {  // Garante que haja, PELO MENOS, DOIS elementos para ordenar
        let posDiv = inicio - 1
        let posPivot = fim
        for(let i = inicio; i < fim; i++) {
            if(vetor[i] < vetor[posPivot]) {
                posDiv++
                [vetor[i], vetor [posDiv]] = [vetor[posDiv], vetor[i]]
            }
        }
        // Último incremento de posDiv, após o loop terminar
        posDiv++
        [vetor[posDiv], vetor[posPivot]] = [vetor[posPivot], vetor[posDiv]]
        quickSort(vetor, inicio, posDiv - 1)    // Lado esquerdo
        quickSort(vetor, posDiv + 1, fim)       // Lado direito
    }
}
//Cria um objeto e coloca a quantidade e nome do dado e joga pro vetor_final2
function inserir_obj(dado, quantidade) {
    let obj = {
        nome: dado,
        valor: quantidade
    }
    vetor_final2.push(obj)
}
//calcula as frequencias 
function frequencias(i) {
    let aux = (i - 1)
    if (aux < 0) {
        let a = (vetor_final2[i].valor / total) * 100
        vetor_final2[i]['Frequencia relativa'] = a
        let b = vetor_final2[i].valor
        vetor_final2[i]['Frequencia acumulada'] = b
        let c = vetor_final2[i]['Frequencia relativa']
        vetor_final2[i]['Frequencia relativa acumulada'] = c
        vetor_final2[i]['intervalo inferior frequencia acumulada'] = 0
    } else {
        let a = (vetor_final2[i].valor / total) * 100
        vetor_final2[i]['Frequencia relativa'] = a
        let b = (vetor_final2[i].valor) + (vetor_final2[aux]['Frequencia acumulada'])
        vetor_final2[i]['Frequencia acumulada'] = b;
        let c = (vetor_final2[i]['Frequencia relativa']) + (vetor_final2[aux]['Frequencia relativa acumulada'])
        vetor_final2[i]['Frequencia relativa acumulada'] = c
        let d = vetor_final2[aux]['Frequencia acumulada']
        vetor_final2[i]['intervalo inferior frequencia acumulada'] = d
    }

}
//gera o grafico
function grafico(vetor_final2, tipo_variavel, titulo) {
    let nome_dado = []
    let valor_dado = []
    let valor_porcentagem = []
    let cores_aleatorias = []
    let cores_aleatorias2 = []
    //gera cores aleatorias pro grafico
    for (let i = 0; i < vetor_final2.length; i++) {
        nome_dado.push(vetor_final2[i]['nome'])
        valor_dado.push(vetor_final2[i]['valor'])
        valor_porcentagem.push(vetor_final2[i]['Frequencia relativa'].toFixed(2))
        let r = Math.floor(Math.random() * 255)
        let g = Math.floor(Math.random() * 255)
        let b = Math.floor(Math.random() * 255)
        let cor = `rgba(${r},${g},${b},0.25)`
        let cor2 = `rgba(${r},${g},${b},1)`
        cores_aleatorias.push(cor)
        cores_aleatorias2.push(cor2)

    }
    var ctx = document.getElementById('myChart');
    //conforme o tipo de variavel se altera o tipo de grafico
    if (tipo_variavel == 1 || tipo_variavel == 2) {

        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: nome_dado,
                datasets: [{
                    label: valor_dado,
                    data: valor_porcentagem,
                    backgroundColor: cores_aleatorias,
                    borderColor: cores_aleatorias2,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: titulo
                }
            }
        });
    } else if (tipo_variavel == 3) {

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nome_dado,
                datasets: [{
                    label: titulo,
                    data: valor_porcentagem,
                    backgroundColor: cores_aleatorias,
                    borderColor: cores_aleatorias2,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    } else if (tipo_variavel == 4) {
        let nome_continuo = []
        for (let i = 0; i < vetor_final2.length; i++) {
            nome_continuo.push(vetor_final2[i]['nome'])
        }
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nome_continuo,
                datasets: [{
                    label: titulo,
                    data: valor_porcentagem,
                    backgroundColor: cores_aleatorias,
                    borderColor: cores_aleatorias2,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        barPercentage: 1.25,
                    }, {
                        display: false,
                        ticks: {
                            autoSkip: false,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })


    }

} // fim função
// calcula as tendencias centrais 
function tendencia_central(vetordados, tipo_variavel, total) {
    let vetor_aux2 = vetordados.slice(0, vetordados.length)
    let stringmediana = ""
    let stringmoda = ""
    let stringmedia = ""
    if (tipo_variavel == 1 || tipo_variavel == 2) {

        stringmediana = achando_mediana(vetordados, total, tipo_variavel)
        stringmoda = achando_moda(vetordados, vetor_aux2,tipo_variavel)

        stringmedia = "Não possui média"

    } // tipo de variavel nominal e ordinal fim
    else if (tipo_variavel == 3) {
        //média 
        let soma = 0
        for (let i = 0; i < vetor_aux2.length; i++) {
            soma += Number(vetor_aux2[i]['nome'] * vetor_aux2[i]['valor'])
        }
        stringmedia = soma / total
        stringmediana = achando_mediana(vetordados, total, tipo_variavel)
        stringmoda = achando_moda(vetordados, vetor_aux2,tipo_variavel)
    } else if (tipo_variavel == 4) {
        let soma = 0

        for (let i = 0; i < vetor_aux2.length; i++) {
            let media_simples = 0
            media_simples = Number((vetor_aux2[i]['limite_inferior'] + vetor_aux2[i]['limite_superior']) / 2)
            soma += Number(vetor_aux2[i]['valor'] * media_simples)

        }
        stringmedia = soma / total
        stringmoda = achando_moda(vetordados, vetor_aux2,tipo_variavel)


        let possiveis_medianas_continua = achando_mediana(vetordados, total, tipo_variavel)
        
            for(a =0 ; a < vetordados.length;a++){
                let nome1 = vetordados[a]['nome']
                if(possiveis_medianas_continua[0] == nome1){
                      let somatoria = Math.ceil(total/2)
                      let fant = vetordados[a-1]['Frequencia acumulada']
                      let fimd = vetordados[a]["valor"]
                      let h = vetordados[a]['limite_superior'] - vetordados[a]['limite_inferior']
                      let i = vetordados[a]['limite_inferior']
                      let fracao = (somatoria - fant)/fimd
                      let md = (fracao*h)+i
                      stringmediana = md
                
                }
            }
        
    }
    
    // criando a tabela dos pontos mediais 
    // cria o cabeçalho da tabela
    let linha_nomes = document.createElement('tr')
    linha_nomes.id = 'cabecalho'
    pontos_centrais.appendChild(linha_nomes)
    //média
    let media = document.createElement('td')
    media.id = 'media'
    media.innerText = "Média"
    linha_nomes.appendChild(media)
    //Mediana
    let mediana_tabela = document.createElement('td')
    mediana_tabela.id = 'mediana_tabela'
    mediana_tabela.innerText = "Mediana"
    linha_nomes.appendChild(mediana_tabela)
    //Moda
    let moda_tabela = document.createElement('td')
    moda_tabela.id = 'moda_tabela'
    moda_tabela.innerText = "Moda"
    linha_nomes.appendChild(moda_tabela)
    //inserindo os valores 
    //CRIAR LINHA NA TABELA
    let linha = document.createElement('tr')
    pontos_centrais.appendChild(linha)
    //valor da média
    let cel1 = document.createElement('td')
    cel1.id = 'media_valor'
    cel1.innerText = stringmedia
    linha.appendChild(cel1)
    //valor da mediana
    let cel2 = document.createElement('td')
    cel2.id = 'mediana_valor'
    cel2.innerText = stringmediana
    linha.appendChild(cel2)
    //valor da moda
    let cel3 = document.createElement('td')
    cel3.id = 'moda_valor'
    cel3.innerText = stringmoda
    linha.appendChild(cel3)

    desvio_padrão(vetor_final2,tipo_variavel,total,stringmedia)
}

// acha a mediana dos 3 primeiros casos
function achando_mediana(vetordados, total, tipo_variavel) {
    let mediana = []
    let stringmediana = ""
    if (total % 2 == 0) {
        let possivel_mediana1 = total/2
        let possivel_mediana2 = possivel_mediana1 + 1
        for (let i = 0; i < vetordados.length; i++) {
            if (possivel_mediana1 <= vetordados[i]['Frequencia acumulada'] && vetordados[i]['intervalo inferior frequencia acumulada'] < possivel_mediana1) {
                mediana.push(vetordados[i]['nome'])
            } else if (possivel_mediana2 <= vetordados[i]['Frequencia acumulada'] && vetordados[i]['intervalo inferior frequencia acumulada'] < possivel_mediana2) {
                mediana.push(vetordados[i]['nome'])
            }
        }


    } else if (total % 2 != 0) {
        let possivel_mediana = Math.ceil(total / 2)
        for (let i = 0; i < vetordados.length; i++) {
            if ((possivel_mediana <= vetordados[i]['Frequencia acumulada']) && (vetordados[i]['intervalo inferior frequencia acumulada'] < possivel_mediana)) {
                mediana.push(vetordados[i]['nome'])

            }
        }
    }
    if (tipo_variavel == 1 || tipo_variavel == 2 || tipo_variavel == 3) {
        for (dado of mediana) {
            stringmediana += dado + " "

        }

        return stringmediana
    } else if (tipo_variavel == 4) {
        return mediana
    }
}
//acha qual é a moda 
function achando_moda(vetordados, vetor_aux2,tipo_variavel) {
    let vetor_frequecias = []
    let moda = []
    let maior_frequencia
    let vetor_frequecias_ordenado = []
    let stringmoda = ""
    for (let i = 0; i < vetor_aux2.length; i++) {
        vetor_frequecias.push(vetor_aux2[i]['valor'])
    }
    vetor_frequecias.sort(function (a, b) {
        return a - b;
    });
    vetor_frequecias_ordenado = vetor_frequecias
    maior_frequencia = vetor_frequecias_ordenado[vetor_frequecias_ordenado.length - 1]
    let vezes_do_vetor = vetor_aux2.length

    for (let a = 0; a < vezes_do_vetor; a++) {
        // USANDO ALGORITMO DE BUSCA
        let indice_moda = buscaSequencial(vetor_aux2, maior_frequencia, (obj, valor) => obj['valor'] === valor)

        if (indice_moda >= 0) {
            moda.push(vetor_aux2[indice_moda]['nome'])
            vetor_aux2.splice(indice_moda, 1)

        } else if (indice_moda == -1) {

            // break
        }
    }

    let tamanho_moda = moda.length
    let tamanho_vetordados = vetordados.length
    if (tamanho_moda == tamanho_vetordados) {
        stringmoda = "Não possui moda"

    } 
   else if(tipo_variavel == 4){
    
        for(i = 0; i < vetordados.length; i++){
            if(moda[0] == vetordados[i]['nome']){
                stringmoda = Number((vetordados[i]['limite_inferior']+ vetordados[i]['limite_superior'])/2)
            }
        }
            
    }
       
    else {
        if (moda.length == 1) {
            stringmoda = moda[0]
        } else if (moda.length > 1) {
            for (dado of moda) {
                stringmoda += dado + "/ "

            }
        }

    }
   
    return stringmoda
}

//calcula as medidas separatrizes
const medias_moveis = document.getElementById('medias_moveis')
const medias_moveis_valores = document.getElementById('medias_moveis_valores')
medias_moveis.addEventListener('click', criando_valores)//chama a função quando escolhemos o valor
function criando_valores(){   
 //remove os valores anteriores 
    for (i = 0; i < medias_moveis_valores.length; i = i ++) {
        medias_moveis_valores.remove(0);
    } 
    let tipo_media = medias_moveis.value
    let intervalo
    // descobre o tipo informado 
if(tipo_media == 'Quartil'){
    intervalo = 25
}else if(tipo_media == 'Quintil'){
    intervalo = 20
}else if(tipo_media == 'Decil'){
    intervalo = 10
}else if(tipo_media == 'Porcentil'){
    intervalo = 1
}
//cria os valores de cada intervalo
for(let i =intervalo; i <=100; i+=intervalo){
    let valor = document.createElement('option')
    valor.innerHTML = i
    medias_moveis_valores.appendChild(valor)
    medias_moveis_valores.addEventListener('click', calcula)
}
//realiza os calculos das medidas separatrizes 
function calcula(){
let porcentagem = medias_moveis_valores.value
let resultado = mediana_movel(vetor_final2,total,tipo_variavel.selectedIndex,porcentagem)

const exibir = document.getElementById('media_movel_resultado')
exibir.innerHTML = resultado
function mediana_movel(vetordados, total, tipo_variavel, porcentagem) {
    let mediana = []
    let stringmediana = ""
   let porcentagem_decimal = porcentagem/100 
        let possivel_mediana1 = total*porcentagem_decimal
        for (let i = 0; i < vetordados.length; i++) {
            if (possivel_mediana1 <= vetordados[i]['Frequencia acumulada'] && vetordados[i]['intervalo inferior frequencia acumulada'] < possivel_mediana1) {
                mediana.push(vetordados[i]['nome'])
                
            } 
        }
    if (tipo_variavel == 1 || tipo_variavel == 2 || tipo_variavel == 3) {
        
            stringmediana = mediana[0]

        return stringmediana
    } else if (tipo_variavel == 4) {
        let fac
        for(a =0 ; a < vetor_final2.length;a++){
            let nome1 = vetor_final2[a]['nome']
            if(mediana[0] == nome1){
                if(a==0){
                     fac = 0
                }
                else {
                     fac = vetor_final2[a-1]['Frequencia acumulada']
                }
                 let posicao = possivel_mediana1
                  let h = vetor_final2[a]['limite_superior'] - vetor_final2[a]['limite_inferior']
                  let i = vetor_final2[a]['limite_inferior']
                  let fi = vetor_final2[a]['valor']
                  let fracao = (posicao - fac)/fi
                  let md = (h*fracao) + i
                  stringmediana = md
            
            }
        }
        return stringmediana
    }
}
}
}
// calcula o desvio padrão 
function desvio_padrão(vetor_final2,tipo_variavel,total,stringmedia){
    let stringvarianca
    let stringDesvioPadrao
    let stringCoeficienteDeVariacao
    let somatoria = 0
    // criando a tabela dos desvios
    // cria o cabeçalho da tabela
    let linha_nomes = document.createElement('tr')
    linha_nomes.id = 'cabecalho'
    desvio.appendChild(linha_nomes)
    //desvio padrao
    let desvio_pad = document.createElement('td')
    desvio_pad.id = 'desvio_pad'
    desvio_pad.innerText = "Desvio Padrão"
    linha_nomes.appendChild(desvio_pad)
    //variança
    let varianca_tabela = document.createElement('td')
    varianca_tabela.id = 'varianca_tabela'
    varianca_tabela.innerText = "Variança"
    linha_nomes.appendChild(varianca_tabela)
    //Coeficiente de variação
    let coeficiente = document.createElement('td')
    coeficiente.id = 'coeficiente'
    coeficiente.innerText = "Coeficiente de variação"
    linha_nomes.appendChild(coeficiente)

    if(tipo_variavel == 1 || tipo_variavel == 2){
        stringvarianca = "Não possui variança"
        stringDesvioPadrao ="Não possui desvio padrão"
        stringCoeficienteDeVariacao = "Não possui coeficiente de Variação"
        //inserindo os valores 
    //CRIAR LINHA NA TABELA
    let linha = document.createElement('tr')
    desvio.appendChild(linha)
    //valor desvio padrao
    let cel1 = document.createElement('td')
    cel1.id = 'desvio_padrao_valor'
    cel1.innerText = stringDesvioPadrao
    linha.appendChild(cel1)
    //valor da mediana
    let cel2 = document.createElement('td')
    cel2.id = 'varianca_valor'
    cel2.innerText = stringvarianca
    linha.appendChild(cel2)
    //valor da moda
    let cel3 = document.createElement('td')
    cel3.id = 'coeficiente_valor'
    cel3.innerText = stringCoeficienteDeVariacao
    linha.appendChild(cel3)
    }
    

    else{
     if(tipo_variavel == 3){
    for (let i = 0; i < vetor_final2.length; i++) {
       somatoria += ((vetor_final2[i]['nome']-stringmedia)**2)*vetor_final2[i]['valor']
    }
}
else if (tipo_variavel == 4){
    for (let i = 0; i < vetor_final2.length; i++) {
        let media_simples = 0
        media_simples = Number((vetor_final2[i]['limite_inferior'] + vetor_final2[i]['limite_superior']) / 2)
        somatoria += ((media_simples - stringmedia)**2)*vetor_final2[i]['valor']

    }
}

if(amostra.checked){
    stringvarianca = somatoria/(total - 1)
}
else if(populacao.checked){
    stringvarianca = somatoria/total

}
stringDesvioPadrao = stringvarianca ** (1/2)
stringCoeficienteDeVariacao = (stringDesvioPadrao/stringmedia) * 100
//inserindo os valores 
    //CRIAR LINHA NA TABELA
    let linha = document.createElement('tr')
    desvio.appendChild(linha)
    //valor desvio padrao
    let cel1 = document.createElement('td')
    cel1.id = 'desvio_padrao_valor'
    cel1.innerText = stringDesvioPadrao.toFixed(2)
    linha.appendChild(cel1)
    //valor da mediana
    let cel2 = document.createElement('td')
    cel2.id = 'varianca_valor'
    cel2.innerText = stringvarianca.toFixed(2)
    linha.appendChild(cel2)
    //valor da moda
    let cel3 = document.createElement('td')
    cel3.id = 'coeficiente_valor'
    cel3.innerText = stringCoeficienteDeVariacao.toFixed(2) + "%"
    linha.appendChild(cel3)
    }

    
}

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})