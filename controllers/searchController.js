const Item = require('../models/Item');

exports.buscaPorTexto = async (req, res) => {
    let query = req.query.query;
    if(!query){
        res.status(203).send({"message": "Sem parametros"});
    }

    try {
        let itens = await Item.find({$text: {$search: query}});
        console.log(itens)
        res.status(200).json(itens);
    } catch (err){
        res.status(400).send({"message": "Erro ao buscar itens"});
    }
}

exports.buscaAvancada = async (req, res) => {

    let palavrasChave = req.query.palavrasChave;
    let tipo = req.query.tipo;
    let categoria = req.query.categoria;
    let dataInicio = req.query.dataInicio;
    let dataFim = req.query.dataFim;

    if(!palavrasChave && !tipo && !categoria && !dataInicio && !dataFim){
        return res.status(203).send({"message": "Sem parametros"});
    }

    let options = {};
    if(palavrasChave){
        options.$text = {$search: palavrasChave}
    }
    if(tipo){
        options.tipo = tipo
    }
    if(categoria){
        options.categoria = categoria
    }
    if(dataInicio){
        options.dataAchadoPerdido = {$gte: new Date(dataInicio)}
    }
    if(dataFim){
        options.dataAchadoPerdido = {$lte: new Date(dataFim)}
    }

    try {
        let itens = await Item.find(options);
        res.status(200).json(itens);
    } catch (err){
        return res.status(400).send({"message": "Erro ao buscar itens"});
    }
}