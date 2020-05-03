const Objective = require("../models/objective");
const KeyResult = require("../models/keyresult");
const Team = require("../models/team");
const Joi = require("@hapi/joi");

const controller = {
    create: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
                completionDate: Joi.date().optional(),
                teamId: Joi.string().optional(),
            });

            await schema.validateAsync(req.body);

            const { label, completionDate, teamId } = req.body;

            const obj = new Objective({
                label,
                completionDate,
                ...(teamId != undefined ? { team: teamId } : undefined),
            });

            await obj.save();

            if (teamId != undefined) {
                const team = await Team.findById(teamId);
                team.objectives.push(obj);
                team.save();
            }

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    },
    list: async (req, res, next) => {
        /**
         * TODO
         * - calculate progress per objective
         * DONE
         * --include query for teamId--
         * --fetch KRs--
         */
        const schema = Joi.object({
            teamId: Joi.string().allow("", null).optional(),
        });

        await schema.validateAsync(req.query);

        let terms = {};
        if (req.query.teamId) {
            terms = {
                team: req.query.teamId,
            };
        }

        const objectives = await Objective.find(terms).populate("keyresults");

        const result = [];

        // Loop through and calculate weighting per krs
        for (const objective of objectives) {
            const progress = 0;

            if (
                objective &&
                objective.keyresults &&
                objective.keyresults.length > 0
            ) {
                for (const kr of objective.keyresults) {
                    console.log("kr", kr);
                }
            }

            result.push({
                label: objective.label,
                completionDate: objective.completionDate,
                progress,
                keyresults: objective.keyresults,
            });
        }

        res.send({
            objectives: result,
        });
    },
    patch: async (req, res, next) => {
        try {
            const schema = Joi.object({
                label: Joi.string().required(),
                teamId: Joi.string().optional(),
                completionDate: Joi.date().optional(),
            });

            await schema.validateAsync(req.body);

            const { label, completionDate, teamId } = req.body;

            const filter = {
                _id: req.params.objectiveId,
            };

            await Objective.updateOne(filter, {
                label,
                completionDate,
                team: teamId,
            });

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
