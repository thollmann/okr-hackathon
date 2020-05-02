const Objective = require("../models/objective");
const KeyResult = require("../models/keyresult");
const Joi = require("@hapi/joi");

const controller = {
    create: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
                type: Joi.string().required(),
                minValue: Joi.number().optional(),
                maxValue: Joi.number().optional(),
                weight: Joi.number().optional(),
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
