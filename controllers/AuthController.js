const User = require('../models/User');
const bcrypt = require('bcryptjs');
module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login');
    }
    static async loginPost(req, res) {
        const { email, password } = req.body;   
        const user = await User.findOne({ where: { email: email } });
        
        /*Usuario existe*/
        if (!user) {
            req.flash('message', 'Usuário não encontrado.');
            res.render('auth/login');
            return;
        }

        /*verificar senha*/
        const passwordMatch = await bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            req.flash('message', 'Senha inválida.');
            res.render('auth/login');
            return;
        }
        /*Tudo ok, autenticar o usuário*/
        req.session.userid = user.id;
        
        req.flash('message', 'Login realizado com sucesso!');
        req.session.save(() => {
            res.redirect('/');
        });
    }

    static register(req, res) {
        res.render('auth/register');
    }
    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        //validações
        if (password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente.');
            res.render('auth/register');
            return;
        }

        //checar se o usuário já existe
        const checkIfUserExists = await User.findOne({ where: { email: email } });
        if (checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso.');
            res.render('auth/register');
            return;
        }

        //criar a password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //criar o usuário
        const user = {
            name,
            email,
            password: hashedPassword
        };

        try {
            const createdUser = await User.create(user);
            req.session.userid = createdUser.id;

            req.flash('message', 'Cadastro realizado com sucesso!');
            
            req.session.save(() => {
                res.redirect('/');
            });

        } catch (error) {
            console.error('Error creating user:', error);
            req.flash('message', 'Erro ao cadastrar usuário.');
            res.render('auth/register');
            return;
        }

    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }
}