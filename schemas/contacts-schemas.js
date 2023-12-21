import Joi from "joi";

export const contactAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" must be exist`,
  }),
  direction: Joi.string().required(),
});

export const contactUpdateSchema = Joi.object({
  title: Joi.string(),
  direction: Joi.string(),
});
