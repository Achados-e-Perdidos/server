const User = require('../models/User');
const Item = require('../models/Item');

exports.cadastrarItem = async (req, res) => {
    
    const body = req.body;

    const newItem = new Item({
        titulo: body.titulo,
        categoria: body.categoria,
        descricao: body.descricao,
        dataAchadoPerdido: body.dataAchadoPerdido,
        imagens: body.imagens
    });

    try {
        await newItem.save();
        res.status(200).json({"message": "Item cadastrado com sucesso"});
    } catch (err){
        res.status(400).json({"message": "Erro ao registrar item"});
    }

}

exports.buscarTodosItens = async (req, res) => {

    try {

        const itens = await Item.find({isAtivo: true}).sort({createAt: 'desc'}).exec();

        res.status(200).json({
            data: itens,
        });

    } catch (err){
        res.status(400).send({"message": "Erro ao buscar itens"});
    }

}

exports.buscarItem = async (req, res) => {

    const itemID = req.params.id;

    try {

        const itens = await Item.findOne({_id: itemID}).exec();

        res.status(200).json({
            data: itens,
        });

    } catch (err){
        res.status(400).send({"message": "Erro ao buscar item"});
    }
}

exports.atualizarItem = async (req, res) => {

    const body = req.body;
    const itemID = req.params.id;

    const filter = { _id: itemID };

    try {
        await Item.findOneAndUpdate(filter, body);

        res.status(200).json({"message": "Item Atualizado com sucesso"});

    } catch (err){
        res.status(400).send({"message": "Erro ao atualizar item"});
    }

}

exports.desativarItem = async (req, res) => {

    const itemID = req.params.id;

    const filter = { _id: itemID };

    try {

        await Item.findOneAndUpdate(filter, {isAtivo: false});

        res.status(200).json({"message": "Item desativado com sucesso"});

    } catch (err){

        res.status(400).send({"message": "Erro ao desativar item"});

    }



}


