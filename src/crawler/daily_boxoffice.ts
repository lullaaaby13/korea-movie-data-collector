import '../infrastructure/mongoose'
import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios';
import delay from "delay";
import DailyBoxOfficeModel from "../model/DailyBoxoffice";
import {appRootPath} from "../utils/appRootPath";
import * as moment from 'moment';

let axiosInstance = axios.create({ baseURL: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json' });

const TOTAL_PAGE = Math.floor(189258 / 100) + 1;
const API_KEY = 'cb879136a6f6b137b31395853d068afb';
const itemPerPage = 100;

const dateFormat = 'YYYYMMDD';

(async () => {

    const startDate = moment("20040101", dateFormat);
    const finishDate = moment().startOf('day');

    while (true) {
        const targetDt = startDate.format(dateFormat);
        axiosInstance.get('', { params: { key: API_KEY, targetDt }})
            .then(async ({ data }) => {
                console.log(`BoxOffice_${targetDt} response success.`);
                const { dailyBoxOfficeList } = data.boxOfficeResult;
                const list = Array.from(dailyBoxOfficeList);

                for (const boxOffice of list) {
                    DailyBoxOfficeModel.create(boxOffice)
                        .then(() => {})
                        .catch(err => backup(boxOffice, `BoxOffice_${targetDt}`));
                }
            }).catch(err => console.log(err));

        await delay(3000);

        // 날짜 증가
        startDate.add(1, 'day');

        // CheckLogic
        const datePointerStr = startDate.format(dateFormat);
        const finishDateStr = finishDate.format(dateFormat);
        if (datePointerStr === finishDateStr) {
            break;
        }
    }
})();

function backup(document: any, fileName: string) {
    const filePath = path.resolve(appRootPath(), 'backup', `${fileName}.json`);
    fs.writeFile(filePath, JSON.stringify(document), () => {});
}