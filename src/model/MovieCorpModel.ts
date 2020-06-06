import { model, Schema } from 'mongoose';

const MovieCorp = new Schema(
    {
        companyCd: {
            type: Number,
            required: true,
            trim: true,
        },
        companyNm: {
            type: String,
            required: true,
            trim: true,
        },
        companyNmEn: {
            type: String,
            required: false,
            trim: true,
        },
        ceoNm: {
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

const MovieCorpModel = model('MovieCorp', MovieCorp);

export default MovieCorpModel;
