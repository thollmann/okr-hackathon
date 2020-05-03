const Objective = require("../models/objective");
const KeyResult = require("../models/keyresult");
const Joi = require("@hapi/joi");

const controller = {
    create: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
                type: Joi.string().required(),
                minValue: Joi.number().required(),
                maxValue: Joi.number().required(),
                currentValue: Joi.number().required(),
                weight: Joi.number().required(),
                decimals: Joi.number().optional(),
            });

            await schema.validateAsync(req.body);

            const existObjective = await Objective.findById(
                req.params.objectiveId
            );
            if (!existObjective) throw new Error("Objective not found");

            const {
                type,
                minValue,
                maxValue,
                currentValue,
                weight,
                decimals,
                label,
            } = req.body;

            const kr = new KeyResult({
                objective: existObjective._id,
                label,
                type,
                minValue,
                maxValue,
                currentValue,
                weight,
                decimals,
            });

            await kr.save();

            existObjective.keyresults.push(kr._id);
            await existObjective.save();

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    },
    patch: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
                type: Joi.string().required(),
                minValue: Joi.number().required(),
                maxValue: Joi.number().required(),
                currentValue: Joi.number().required(),
                weight: Joi.number().required(),
                decimals: Joi.number().optional(),
            });

            await schema.validateAsync(req.body);

            const {
                type,
                minValue,
                maxValue,
                currentValue,
                weight,
                decimals,
                label,
            } = req.body;

            const filter = {
                _id: req.params.keyResultId,
            };

            await KeyResult.updateOne(filter, {
                label,
                type,
                minValue,
                maxValue,
                currentValue,
                weight,
                decimals,
            });

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            const filter = {
                _id: req.params.keyResultId,
            };
            await KeyResult.deleteMany(filter);

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    },
};

module.exports = controller;
