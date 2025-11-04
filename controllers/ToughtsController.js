const Tought = require('../models/Tought');
const User = require('../models/User');
const { Op } = require('sequelize');

module.exports = class ToughtsController {
    static async showToughts(req, res) {

        let search = '';
        let order = 'DESC';




        if(req.query.search) {
            search = req.query.search;
        }
                
        if (req.query.order === 'old') {
            order = 'ASC';
        }else{
            order = 'DESC';
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            }, 
            order: [['createdAt', order]]
        })

        const toughts = toughtsData.map((result) => result.get({ plain: true }));

        let toughtsQty = toughts.length;

        if(toughtsQty === 0) {
            toughtsQty = false;
        }

        res.render('toughts/home', { toughts, search, toughtsQty });
    }

    static async dashboard(req, res) {

        const userId = req.session.userid;
        const user = await User.findOne(
            {where: {id: userId},
            include: Tought,
            plain: true}
        );

        //Verificação se o usuario existe
        if(!user) {
            res.redirect('/login');
            return;
        }
        // Converte cada instância de Tought em um objeto simples, pegando apenas os dados (dataValues)
        const toughts = user.Toughts.map((result)=> result.dataValues);

        let emprtyToughts = false;

        if(toughts.length === 0) {
            emprtyToughts = true;
        }

        res.render('toughts/dashboard', {toughts, emprtyToughts});
    }

    static async deleteTought(req, res) {
        //pega o id do pensamento
        const id = req.body.id;

        //pega o id do usuario logado
        const userId = req.session.userid;

        try {
            //deleta o pensamento onde o id do pensamento e o id do usuario batem
            await Tought.destroy({where: {id: id, UserId: userId}});

            // Redireciona o usuário de volta para o dashboard
            req.flash('message', 'Pensamento deletado com sucesso!');

            res.redirect('/toughts/dashboard');
        } catch (error) {
            console.error(error);
            req.flash('error', 'Erro ao deletar pensamento.');
            res.redirect('/toughts/dashboard');
        }
    }

    static async createTought(req, res) {
        res.render('toughts/add');
    }

    static async editTought(req, res) {
        const id = req.params.id;

        const tought = await Tought.findOne({where: {id: id}, raw: true});

        if(!tought) {
            req.flash('error', 'Pensamento não encontrado.');
            return res.redirect('/toughts/dashboard');
        }

        res.render('toughts/edit', {tought});
    }

    static async editToughtSave(req, res) {
        const id = req.body.id;
        const tought = {
            title: req.body.title
        };
        try {
            await Tought.update(tought, {where: {id: id}});
            req.flash('message', 'Pensamento atualizado com sucesso!');
            res.redirect('/toughts/dashboard');
        } catch (error) {
            console.error(error);
            req.flash('error', 'Erro ao atualizar pensamento.');
            res.redirect('/toughts/dashboard');
        }
    }

    static async createToughtSave(req, res) {
        const userId = req.session.userid;
        const tought = {
            title: req.body.title,
            UserId: userId
        };

        try {
            await Tought.create(tought);
            req.flash('message', 'Pensamento criado com sucesso!');
            res.redirect('/toughts/dashboard');
        } catch (error) {
            console.error(error);
            req.flash('error', 'Erro ao criar pensamento.');
            res.redirect('/toughts/dashboard');
        }

    }

};