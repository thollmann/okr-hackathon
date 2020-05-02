const Objective = require("../models/objective");
const Joi = require("@hapi/joi");

const controller = {
    create: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
                completionDate: Joi.date().optional(),
            });

            await schema.validateAsync(req.body);

            const { label, completionDate } = req.body;

            const obj = new Objective({
                label,
                completionDate,
            });

            await obj.save();

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

        const objectives = Objective.find();

        res.send({
            objectives: await objectives.exec(),
        });
    },
    patch: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
                completionDate: Joi.date().optional(),
            });

            await schema.validateAsync(req.body);

            const { label, completionDate } = req.body;

            const filter = {
                _id: req.params.objectiveId,
            };
            await Objective.updateOne(filter, { label, completionDate });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            const filter = {
                _id: req.params.objectiveId,
            };
            await Objective.deleteMany(filter);

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    },
};

module.exports = controller;
