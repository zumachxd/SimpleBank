import Joi from 'joi';

const creatUserValidate = async (unknow: unknown) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        passwordHash: Joi.string().min(8).pattern(new RegExp(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)).required(),
    })
 const {error} = schema.validate(unknow);
if(error) throw error;

};

export default creatUserValidate;