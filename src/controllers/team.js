const Team = require("../models/team");
const Joi = require("@hapi/joi");

const controller = {
    create: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
            });

            await schema.validateAsync(req.body);

            const { label, completionDate } = req.body;

            const team = new Team({
                label,
                completionDate,
            });

            await team.save();

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    },
    list: async (req, res, next) => {
        /**
         * Todos
         * - include query for teamId
         * - calculate progress per objective
         * - fetch KRs
         */

        const teams = Team.find();

        res.send({
            teams: await teams.exec(),
        });
    },
    patch: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
            });

            await schema.validateAsync(req.body);

            const { label } = req.body;

            const filter = {
                _id: req.params.teamId,
            };
            await Team.updateOne(filter, { label });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            const filter = {
                _id: req.params.teamId,
            };
            await Team.deleteMany(filter);

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    },
};

module.exports = controller;
