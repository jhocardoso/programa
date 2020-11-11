/*********************Correlação ******************************/
//captura os dados e cria variaveis para se utilizar no contexto global 
let dadosx = document.getElementById("valorX")
let dadosy = document.getElementById("valorY")
const tabela = document.getElementById("tabelasvariaveis")
let a
let b
let tira_espaco = /\s*;\s*/; // Tira os espaços entre os ";"
const resultado = document.getElementById("button")
let vetorcomobj = []
resultado.addEventListener('click', botaoClique)
const limpa_correlacao = document.getElementById('graficoCorrelacao')
const show3 = document.getElementById('to-top')
const divFutura = document.getElementById('calculo_correlação')
let cont = 0
var vetx = []
var vety = []
//função para calcular a correlação 
function botaoClique() {

    if (cont > 0) {
        vetorcomobj.splice(0)
        vetx.splice(0)
        vety.splice(0)
        while (tabela.firstChild) {
            tabela.removeChild(tabela.firstChild)
        }
    }
    cont += 1

    // CRIANDO O VETOR X           
    let dados_valoresX = dadosx.value
    dados_valoresX = dados_valoresX.replace(/,/g, ".") // Troca a ',' decimal para o '.' decimal
    let vetor1 = dados_valoresX.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetorX = vetor1.filter(x => x.trim()) // Remove itens vazios do vetor
    // CRIANDO O VETOR Y           
    let dados_valoresY = dadosy.value
    dados_valoresY = dados_valoresY.replace(/,/g, ".") // Troca a ',' decimal para o '.' decimal
    let vetor2 = dados_valoresY.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetorY = vetor2.filter(x => x.trim()) // Remove itens vazios do vetor

    // Muda os elemtos do vetorX para Number
    let aux = [];
    for (let i = 0; i < vetorX.length; i++) {
        aux[i] = isNaN(vetorX[i]) ? 0 : 1;
    }
    if (aux.indexOf(0) == -1 && aux.indexOf(1) == 0) {
        for (let i = 0; i < vetorX.length; i++) {
            vetorX[i] = parseFloat(vetorX[i]);
        }
    }
    // Muda os elemtos do vetorY para Number
    let aux1 = [];
    for (let i = 0; i < vetorY.length; i++) {
        aux1[i] = isNaN(vetorY[i]) ? 0 : 1;
    }
    if (aux1.indexOf(0) == -1 && aux1.indexOf(1) == 0) {
        for (let i = 0; i < vetorY.length; i++) {
            vetorY[i] = parseFloat(vetorY[i]);
        }
    }


    //verifica se tem string nos dados coletados 
    let validacaoX = temString(vetorX)
    let validacaoY = temString(vetorY)
    let podeseguir = true
    //validação dos dados
    //se tiver string os dados estão incorretos
    if (validacaoX) {
        Swal.fire({
            icon: "error",
            title: "Os valores de x devem ser apenas números",
            text: "",
            didClose: () => {
                dadosx.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    } else if (validacaoY) {
        Swal.fire({
            icon: "error",
            title: "Os valores de Y devem ser apenas números",
            text: "",
            didClose: () => {
                dadosy.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    }
    //verifica se há mesma quantidade de dados tanto do x quanto de y
    else if (vetorY.length > vetorX.length || vetorY.length < vetorX.length) {
        Swal.fire({
            icon: "error",
            title: "A quantidade de elementos de X e Y devem ser iguais",
            text: "",
            didClose: () => {
                dadosy.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    }
    //verifica se tem dados no x
    else if (validacaoX == "falta") {
        Swal.fire({
            icon: "error",
            title: "Insira os dados de X",
            text: "",
            didClose: () => {
                dadosy.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    }
    //verifica se tem dados no y 
    else if (validacaoY == "falta") {
        Swal.fire({
            icon: "error",
            title: "Insira os dados de Y",
            text: "",
            didClose: () => {
                dadosy.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false
    } 
    //verifica se existe pelo menos 2 elementos em cada
    else if (vetorX.length < 2 || vetorY.length < 2) {
        Swal.fire({
            icon: "error",
            title: "A quantidade minima de Xs e de Ys é de 2 cada e o ideal são no minimo 15 valores cada",
            text: "",
            didClose: () => {
                dadosy.focus()
            } // Coloca o cursor no elemento especificado
        })
        podeseguir = false


    }
    //se não faltar dados pode seguir os calculos
    else if (podeseguir) {
        //coloca em um unico vetor os dados x e y e ainda faz as contas basicas
        for (let i = 0; i < vetorX.length; i++) {
            inserir_obj(vetorX[i], vetorY[i])
        }
        // cria as variaveis de somatoria dos dados
        let somatoriaX = 0
        let somatoriaY = 0
        let somatoriaYaoquadrado = 0
        let somatoriaXaoquadrado = 0
        let somatoriaXY = 0
        //faz a somatoria dos dados
        for (conteudo of vetorcomobj) {
            somatoriaX += conteudo.X
            somatoriaY += conteudo.Y
            somatoriaYaoquadrado += conteudo.Yaoquadrado
            somatoriaXaoquadrado += conteudo.Xaoquadrado
            somatoriaXY += conteudo.XY
        }
        let n = vetorcomobj.length//o tamanho do vetor informa a quantidade de dados
        //realiza os calculos 
        let numerador_ra = (n * somatoriaXY) - (somatoriaX * somatoriaY)
        let tcdenominador_ra = ((n * somatoriaXaoquadrado) - (somatoriaX ** 2)) //termo em comun do denominador de r e a 
        let denominador_r = (tcdenominador_ra ** (1 / 2) * ((n * somatoriaYaoquadrado) - (somatoriaY ** 2)) ** (1 / 2))
        let r = numerador_ra / denominador_r
        a = numerador_ra / tcdenominador_ra
        b = (somatoriaY / n) - ((somatoriaX / n) * (a))
        let r_percentual = (r * 100).toFixed(2)
        let nivel_de_correlacao




        //correlação entre as duas variaveis
        if (r > 0) {
            if (r < 0.30) {
                nivel_de_correlacao = "Fraca positiva"
            } else if (r >= 0.30 && r < 0.70) {
                nivel_de_correlacao = "Moderada positiva"
            } else if (r >= 0.70 && r < 1) {
                nivel_de_correlacao = "Forte positiva"
            } else if (r == 1) {
                nivel_de_correlacao = "Perfeita positiva"
            }
        } else if (r < 0) {
            if (r > -0.30) {
                nivel_de_correlacao = "Fraca negativa"
            } else if (r <= -0.30 && r > -0.70) {
                nivel_de_correlacao = "Moderada negativa"
            } else if (r <= -0.70 && r > -1) {
                nivel_de_correlacao = "Forte negativa"
            } else if (r == -1) {
                nivel_de_correlacao = "Perfeita negativa"
            }
        } else if (r == 0) {
            nivel_de_correlacao = "Variaveis Não correlacionadas"
        }
        // cria o cabeçalho da tabela
        let linha_nomes = document.createElement('tr')
        linha_nomes.id = 'cabecalho'
        tabela.appendChild(linha_nomes)
        //correlação porcentagem
        let correlacao_porcentagem = document.createElement('td')
        correlacao_porcentagem.id = 'correlacao_porcentagem'
        correlacao_porcentagem.innerText = "Correlação"
        linha_nomes.appendChild(correlacao_porcentagem)
        //Nivel de correlaçao
        let niveldecorelacao = document.createElement('td')
        niveldecorelacao.id = 'niveldecorelacao'
        niveldecorelacao.innerText = "Nível de Correlação"
        linha_nomes.appendChild(niveldecorelacao)
        //equação de Regreção
        let equacao_regrecao = document.createElement('td')
        equacao_regrecao.id = 'equacao_regrecao'
        equacao_regrecao.innerText = "Equação de Regressão"
        linha_nomes.appendChild(equacao_regrecao)
        // criando a linha dos valores
        let linha_valores = document.createElement('tr')
        linha_valores.id = 'valores'
        tabela.appendChild(linha_valores)
        //valor correlação
        let correlacao_porcentagem_valor = document.createElement('td')
        correlacao_porcentagem_valor.id = 'correlacao_porcentagem_valor'
        correlacao_porcentagem_valor.innerText = r_percentual + "%"
        linha_valores.appendChild(correlacao_porcentagem_valor)
        //nivel de correlação nivel
        let nivel = document.createElement('td')
        nivel.id = 'nivel'
        nivel.innerText = nivel_de_correlacao
        linha_valores.appendChild(nivel)
        //equação 
        let b_exibicao = b
        if (b >= 0) {
            b_exibicao = `+ ${b.toFixed(2)}`
        }
        let equacao = document.createElement('td')
        equacao.id = 'equacao'
        equacao.innerText = `Y= ${a.toFixed(2)}X ${b_exibicao}`
        linha_valores.appendChild(equacao)

        const mostrar = document.getElementById('calculo_correlação')
        mostrar.style.visibility = 'visible' //('visibility visible')

        // Criando Valores futuros
        let divValorFuturo
        divValorFuturo = "<div id='calculo_correlação2' class='inputFuturo'>"
        divValorFuturo += "<h3 class='h3-futuro'>Valores Futuros</h3>"
        divValorFuturo += "<label class='label-futuro'>X:</label>"
        divValorFuturo += "<input type='text' id='valor_futuroX' onkeyup='completarValorFuturo(this.value, 1, a, b);' placeholder='Valor Futuro de X'></input>"
        divValorFuturo += "<label class='label-futuro'>Y:</label>"
        divValorFuturo += "<input type='text' id='valor_futuroY' onkeyup='completarValorFuturo(this.value, 2, a, b);' placeholder='Valor Futuro de Y'></input>"
        divValorFuturo += "</div>"
        divFutura.innerHTML = divValorFuturo

        // Criando gráfico
        limpa_correlacao.classList.remove("correlacao")
        graficoCorrelacao(vetorX, vetorY, a, b)

        show3.style.display = 'flex' // Mostar botão de rolar para cima        

        // Descer a página após clicar no botão
        $('html, body').animate({
            scrollTop: 2000
        }, 0);
    }
}

//função para descobrir se tem string ou se os dados estão vazios 
function temString(vetor_final) {
    let conta_numero = 0
    let conta_string = 0
    for (conteudo of vetor_final) {
        let descubra = parseFloat(conteudo)

        if (isNaN(descubra)) {
            conta_string++
        } else {
            conta_numero++
        }
    }
    if (conta_string > 0) return true
    else if (conta_numero == 0) return "falta"
    else return false
}
//cria o vetor com os dados e com alguns pré calculos
function inserir_obj(x, y) {
    let obj = {
        X: Number(x),
        Y: Number(y),
        XY: x * y,
        Xaoquadrado: x * x,
        Yaoquadrado: y * y
    }
    vetorcomobj.push(obj)
}

// Função para arredondamento
function arredondar(num, n) {
    return parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n)
}

// Função para Valor Futuro
function completarValorFuturo(valor, escolha, a, b) {
    if (escolha == 1) {
        $('#valor_futuroY').val(parseFloat(arredondar(parseFloat(a) * parseFloat(valor) + parseFloat(b), 2)));
    } else if (escolha == 2) {
        $('#valor_futuroX').val(parseFloat(arredondar((parseFloat(valor) - parseFloat(b)) / parseFloat(a), 2)));
    }
}

/********************   GRAFICO CORRELAÇÃO   *********************/
function graficoCorrelacao(vetor_X, vetor_Y, a, b) {
    let x = vetor_X
    var y = vetor_Y
    let ymin, ymax, xmin, xmax
    let limiteMin = xmin - 50
    let limiteMax = xmax + 50
    let observacoes = []
    let regressao = []
    //Determinar os valores da Reta Y
    for (let i in x) {
        if (i == 0) {
            ymin = parseInt(y[i]);
            ymax = parseInt(y[i]);
        }
        if (parseInt(y[i]) > ymax) ymax = parseInt(y[i])
        if (parseInt(y[i]) < ymin) ymin = parseInt(y[i])
    }

    let vetor_X_Sort = vetor_X.slice();
    vetor_X_Sort.sort(function (a, b) {
        return a - b
    })

    if (vetor_X_Sort[0] * 0.1 > 2) {
        xmin = vetor_X_Sort[0] - 2;
    } else {
        xmin = vetor_X_Sort[0] * 0.9;
    }

    if (vetor_X_Sort[vetor_X_Sort.length - 1] * 0.1 > 2) {
        xmax = vetor_X_Sort[vetor_X_Sort.length - 1] + 2
    } else {
        xmax = vetor_X_Sort[vetor_X_Sort.length - 1] * 1.1
    }

    for (let i = 0; i < vetor_X.length; i++) {
        let obs = []
        obs.push(vetor_X[i])
        obs.push(vetor_Y[i])
        observacoes.push(obs)
    }

    vetor_X_Sort.unshift(limiteMin)
    vetor_X_Sort.push(limiteMax)
    for (let i = 0; i < vetor_X_Sort.length; i++) {
        let point = []
        point.push(vetor_X_Sort[i])
        point.push(parseFloat(arredondar(parseFloat(a) * vetor_X_Sort[i] + parseFloat(b), 2)))
        regressao.push(point)
    }

    var MyChart = Highcharts.chart('graficoCorrelacao', {
        chart: {
            type: 'scatter',
            backgroundColor: '#DCDCDC',
            borderColor: '#4D1717',
            borderWidth: 8
        },
        title: {
            text: 'Gráfico Correlação e Regressão',
            style: {
                fontFamily: 'Poppins',
                color: '#4D1717',
                fontSize: "30px",
                fontWeight: 'bolder',
                textDecoration: 'underline'
            },
            y: 40
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Valores em X',
                style: {
                    color: '#000'
                }
            },
            startOnTick: false,
            endOnTick: false,
            showLastLabel: true,
            min: xmin,
            max: xmax
        },
        yAxis: {
            title: {
                text: 'Valores em Y',
                style: {
                    color: '#000'
                }
            },
            min: ymin,
            max: ymax
        },
        series: [{
            type: 'scatter',
            name: 'Pontos',
            color: '#4D1717',
            data: observacoes,
            marker: {
                radius: 5
            }
        }, {
            type: 'line',
            name: 'Reta de Regressão',
            color: '#4D1717',
            data: regressao,
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    lineWidth: 0
                }
            },
            enableMouseTracking: false
        }]
    });

}
/*****************************************************************/


/*****************BOTÃO DE LIMPAR DADOS********************/
function botaoApagar() {
    vetorcomobj.splice(0)
    vetx.splice(0)
    vety.splice(0)
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild)
    }
    dadosx.value = ''
    dadosy.value = ''
    limpa_correlacao.classList.add("correlacao")
    const divFutura2 = document.getElementById('calculo_correlação2')
    divFutura2.classList.add("esconder")
}
/************************************************************/


/*****************BOTÃO DE VOLTAR AO TOPO********************/
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})
/************************************************************/