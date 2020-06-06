import { model, Schema } from 'mongoose';

const MovieSimple = new Schema(
    {
        movieCd: {
            type: Number,
            required: true,
            trim: true,
        },
        movieNm: {
            type: String,
            required: true,
            trim: true,
        },
        movieNmEn: {
            type: String,
            required: false,
            trim: true,
        },
        prdtYear: {
            type: String,
            required: false,
            trim: true,
        },
        openDt: {
            type: String,
            required: false,
            trim: true,
        },
        typeNm: {
            type: String,
            required: false,
            trim: true,
        },
        prdtStatNm: {
            type: String,
            required: false,
            trim: true,
        },
        nationAlt: {
            type: String,
            required: false,
            trim: true,
        },
        genreAlt: {
            type: String,
            required: false,
            trim: true,
        },
        repNationNm: {
            type: String,
            required: false,
            trim: true,
        },
        repGenreNm: {
            type: String,
            required: false,
            trim: true,
        },
        directors: [{
            peopleNm: String
        }],
        companys: [{
            companyCd: Number,
            companyNm: String
        }],

    },
    { timestamps: true },
);

const MovieSimpleModel = model('MovieSimple', MovieSimple);

export default MovieSimpleModel;
