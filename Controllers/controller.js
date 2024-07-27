const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { User, Portfolio, TrainingEvent, ListPeserta, Service } = require('../models');
const { checkPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

// require('dotenv').config();

class Controller {
    static async register(req, res, next) {
        try {
            const { nama_lengkap, email, nomor_hp, password, tanggal_lahir, jenis_kelamin, role } = req.body;
            const user = await User.create({
                nama_lengkap,
                email,
                nomor_hp,
                password,
                tanggal_lahir,
                jenis_kelamin,
                role: 'user'
            });
            res.status(201).json({
                id: user.id,
                email: user.email,
                nama_lengkap: user.nama_lengkap,
                email: user.email,
                nomor_hp: user.nomor_hp,
                password: user.password,
                tanggal_lahir: user.tanggal_lahir,
                jenis_kelamin: user.jenis_kelamin,
                role: user.role
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) throw { name: 'wrong data' };

            const isValidPassword = checkPassword(password, user.password);
            if (!isValidPassword) throw { name: 'wrong data' };

            const access_token = signToken({
                id: user.id,
                email: user.email
            });
            const role = user.role;
            const id = user.id;
            res.status(200).json({
                access_token,
                role,
                id
            });
        } catch (err) {
            next(err);
        }
    }

    static async getProfile(req, res, next) {
        try {
            const findUser = await User.findByPk(+req.user.id);
            res.status(200).json({
                id: findUser.id,
                isPremium: findUser.isPremium
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteUserById(req, res, next) {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id } });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            next(err);
        }
    }

    static async getUsers(req, res, next) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    static async getPortfolios(req, res, next) {
        try {
            const portfolios = await Portfolio.findAll();
            res.status(200).json(portfolios);
        } catch (err) {
            next(err);
        }
    }

    static async getServices(req, res, next) {
        try {
            const services = await Service.findAll();
            res.status(200).json(services);
        } catch (err) {
            next(err);
        }
    }

    static async getTrainingEvents(req, res, next) {
        try {
            const trainingEvents = await TrainingEvent.findAll();
            res.status(200).json(trainingEvents);
        } catch (err) {
            next(err);
        }
    }

    static async addTrainingEvents(req, res, next) {
        try {
            const { judul, tanggal } = req.body;
            let link_gambar = null;

            if (req.file) {
                const filePath = path.join(__dirname, '..', 'public', 'uploads', req.file.filename);
                link_gambar = `/uploads/${req.file.filename}`;
            }

            const newEvent = await TrainingEvent.create({
                link_gambar,
                judul,
                tanggal
            });

            res.status(201).json(newEvent);
        } catch (err) {
            console.error('Error adding training event:', err);
            next(err);
        }
    }

    static async deleteTrainingEvents(req, res, next) {
        try {
            const { id } = req.params;
            await TrainingEvent.destroy({ where: { id } });
            res.status(200).json({ message: 'Training event deleted successfully' });
        } catch (err) {
            next(err);
        }
    }

    static async getListPeserta(req, res, next) {
        try {
            const listPeserta = await ListPeserta.findAll();
            res.status(200).json(listPeserta);
        } catch (err) {
            next(err);
        }
    }

    static async addListPeserta(req, res, next) {
        try {
            console.log(req.files, 'kocak'); // Tambahkan log ini untuk melihat struktur req.files
    
            const { Jenjang, Bidang, SubBidang, batch } = req.body;
            const { userId: UserId, trainingEventId: TrainingEventId } = req.query;
    
            const form_pp = req.files['form_pp'] ? `/uploads/${req.files['form_pp'][0].filename}` : null;
            const Ktp = req.files['Ktp'] ? `/uploads/${req.files['Ktp'][0].filename}` : null;
            const Ijazah = req.files['Ijazah'] ? `/uploads/${req.files['Ijazah'][0].filename}` : null;
            const pas_foto = req.files['pas_foto'] ? `/uploads/${req.files['pas_foto'][0].filename}` : null;
            const sk = req.files['sk'] ? `/uploads/${req.files['sk'][0].filename}` : null;
            const foto_kegiatan = req.files['foto_kegiatan'] ? `/uploads/${req.files['foto_kegiatan'][0].filename}` : null;
    
            const newPeserta = await ListPeserta.create({
                UserId,
                TrainingEventId,
                Jenjang,
                Bidang,
                SubBidang,
                form_pp,
                Ktp,
                Ijazah,
                pas_foto,
                sk,
                foto_kegiatan,
                batch
            });
    
            res.status(201).json(newPeserta);
        } catch (err) {
            next(err);
        }
    }
    


    static async deleteListPeserta(req, res, next) {
        try {
            const { id } = req.params;
            await ListPeserta.destroy({ where: { id } });
            res.status(200).json({ message: 'List peserta deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;
