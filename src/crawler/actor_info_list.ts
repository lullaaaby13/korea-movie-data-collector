import '../infrastructure/mongoose'
import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios';
import delay from "delay";
import SimpleActorModel from "../model/SimpleActor";
import {appRootPath} from "../utils/appRootPath";


let axiosInstance = axios.create({ baseURL: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json' });

const TOTAL_PAGE = Math.floor(189258 / 100) + 1;
const API_KEY = 'cb879136a6f6b137b31395853d068afb';
const itemPerPage = 100;

(async () => {
    for (let page = 1; page <= TOTAL_PAGE; page++) {
        // console.log(`${page} 페이지 시작`)
        const startedAt = new Date().getTime();
        axiosInstance.get('', { params: { key: API_KEY, itemPerPage, page } })
            .then(async ({ data }) => {
                // console.log(`${page} 응답 Success`)
                const { peopleList } = data.peopleListResult;
                const list = Array.from(peopleList);
                const createPromises = list.map(actor => {
                    // @ts-ignore
                    const { peopleCd, peopleNm, peopleNmEn, repRoleNm, filmoNames } = actor;
                    // @ts-ignore
                    const movieNms = Array.from(filmoNames.split('|')).filter(movieNm => movieNm !== '').map(movieNm => { return { movieNm }; });
                    const document = {
                        peopleCd, peopleNm, peopleNmEn, repRoleNm,
                        filmoNames: movieNms
                    };
                    return document;
                }).map(document => SimpleActorModel.create(document));

                Promise.all(createPromises)
                    .then(data => {
                        const finishedAt = new Date().getTime();
                        console.log(`[SimpleActor] ${page} 페이지 완료 (소요시간 = ${finishedAt - startedAt}ms)`)
                    })

            })
            .catch(err => console.log(err));
        await delay(8000);
    }
})();

function backup(document: any, fileName: string) {
    const filePath = path.resolve(appRootPath(), 'backup', `${fileName}.json`);
    fs.writeFile(filePath, JSON.stringify(document), () => {});
}