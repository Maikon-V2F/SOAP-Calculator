const soap = require('soap');
const url = 'http://www.dneonline.com/calculator.asmx?WSDL';

const argumentos = process.argv.slice(2);
const intA = parseInt(argumentos[0]);
const intB = parseInt(argumentos[1]);
const operacao = argumentos[2];

// Mapeamento das operações para os métodos do serviço SOAP
const operacaoSOAP = {
    "adicionar": "Add",
    "subtrair": "Subtract",
    "multiplicar": "Multiply",
    "dividir": "Divide"
};

const metodoSOAP = operacaoSOAP[operacao];

if (!metodoSOAP) {
    console.error("Operação inválida. As operações válidas são: adicionar, subtrair, multiplicar, dividir");
    process.exit(1);
}

async function performOperation() {
    try {
        const client = await soap.createClientAsync(url);
        client[metodoSOAP]({ intA, intB }, function(err, result) {
            if (err) {
                console.error('Erro ao realizar operação assíncrona:', err);
            } else {
                const resultado = result[`${metodoSOAP}Result`];
                console.log('Resultado:', resultado);
            }
        });
    } catch (error) {
        console.error('Erro ao criar cliente SOAP:', error);
    }
}

performOperation();
