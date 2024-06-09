const soap = require('soap');
const url = 'http://www.dneonline.com/calculator.asmx?WSDL';

const argumentos = process.argv.slice(2);
const intA = parseInt(argumentos[0]);
const intB = parseInt(argumentos[1]);
const operacao = argumentos[2];

const operacaoSOAP = {
    "adicionar": "Add",
    "subtrair": "Subtract",
    "multiplicar": "Multiply",
    "dividir": "Divide"
};

const metodoSOAP = operacaoSOAP[operacao];

soap.createClient(url, function(err, client) {
    if (err) {
        console.error('Erro ao criar cliente SOAP:', err);
        return;
    }
    client[metodoSOAP]({ intA, intB }, function(err, result) {
        if (err) {
            console.error('Erro ao chamar operação SOAP:', err);
            return;
        }
        const resultado = result[`${metodoSOAP}Result`];
        console.log(resultado);
    });
});
