import { model, Schema } from 'mongoose';

const DailyBoxOffice = new Schema(
    {
        rank: {
            type: Number,
            required: true,
            trim: true,
        },
        rankInten: {
            type: Number,
            required: true,
            trim: true,
        },
        rankOldAndNew: {
            type: String,
            required: false,
            trim: true,
        },
        movieCd: {
            type: Number,
            required: false,
            trim: true,
        },
        movieNm: {
            type: String,
            required: false,
            trim: true,
        },
        openDt: {
            type: String,
            required: false,
            trim: true,
        },
        salesAmt: {
            type: Number,
            required: false,
            trim: true,
        },
        salesShare: {
            type: Number,
            required: false,
            trim: true,
        },
        salesInten: {
            type: Number,
            required: false,
            trim: true,
        },
        salesChange: {
            type: Number,
            required: false,
            trim: true,
        },
        salesAcc: {
            type: Number,
            required: false,
            trim: true,
        },
        audiCnt: {
            type: Number,
            required: false,
            trim: true,
        },
        audiInten: {
            type: Number,
            required: false,
            trim: true,
        },
        audiChange: {
            type: Number,
            required: false,
            trim: true,
        },
        audiAcc: {
            type: Number,
            required: false,
            trim: true,
        },
        scrnCnt: {
            type: Number,
            required: false,
            trim: true,
        },
        showCnt: {
            type: Number,
            required: false,
            trim: true,
        },
    },
    { timestamps: true },
);

const DailyBoxOfficeModel = model('DailyBoxOffice', DailyBoxOffice);

export default DailyBoxOfficeModel;
