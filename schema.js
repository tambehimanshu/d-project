const Joi = require('joi');
const { Schema } = require('mongoose');

module.exports.listingSchema = Joi.object({
    listing : Joi.object(
        {
            title:Joi.string().required(),
            description: Joi.string().required(),
            location:  Joi.string().required(),
            country: Joi.string().required(),
            price: Joi.number().required().min(0),
            image: Joi.string().allow("",null)
        }
    ).required()
})

const minRating = 1;
const maxRating = 5;

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(minRating).max(maxRating),
        comment: Joi.string().required(),
    }).required(),
});
