import { model, Schema } from 'mongoose';

const SimpleActor = new Schema(
    {
        peopleCd: {
            type: Number,
            required: true,
            trim: true,
        },
        peopleNm: {
            type: String,
            required: true,
            trim: true,
        },
        peopleNmEn: {
            type: String,
            required: false,
            trim: true,
        },
        repRoleNm: {
            type: String,
            required: false,
            trim: true,
        },
        filmoNames: [{
            movieNm: String
        }]
    },
    { timestamps: true },
);

const SimpleActorModel = model('SimpleActor', SimpleActor);

export default SimpleActorModel;
