import { CREATE, JoiSchema, JoiSchemaOptions, UPDATE } from "nestjs-joi";
import * as Joi from 'joi';

/**
 * @description added Joi validation on incoming data
 */
@JoiSchemaOptions({
    allowUnknown: false,
})

/**
 * @description Data Transfer Object (Dto) Schema for Pokemon (payload)
 */
export class dtoCreatePokemon {
    @JoiSchema(Joi.number().required())
    @JoiSchema([CREATE], Joi.number().required())
    id!: number;
    
    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    name!: string;

    @JoiSchema(Joi.string().required())
    @JoiSchema([CREATE], Joi.string().required())
    image!: string;
}