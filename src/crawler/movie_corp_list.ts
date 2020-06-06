import '../infrastructure/mongoose'
import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios';
import delay from "delay";
import MovieCorpModel from "../model/MovieCorpModel";
import {appRootPath} from "../utils/appRootPath";


let axiosInstance = axios.create({ baseURL: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/company/searchCompanyList.json' });

const TOTAL_PAGE = Math.floor(12249 / 100) + 1;
const API_KEY = '20ead14dd4a4d1b8107cbec397c39f7b';
const itemPerPage = 100;

(async () => {
    for (let page = 1; page <= TOTAL_PAGE; page++) {
        console.log(`${page} 페이지 시작`)
        axiosInstance.get('', { params: { key: API_KEY, itemPerPage, page } })
            .then(({ data }) => {
                // console.log(`${page} 응답 Success`)
                const { companyList } = data.companyListResult;
                const list = Array.from(companyList);
                list.forEach((company, index) => {
                    // @ts-ignore
                    const { companyCd, companyNm, companyNmEn, companyPartNames, ceoNm, filmoNames } = company;
                    // @ts-ignore
                    const movieNms = Array.from(filmoNames.split(',')).filter(movieNm => movieNm !== '').map(movieNm => { return { movieNm }; });
                    const document = {
                        companyCd, companyNm, companyNmEn, companyPartNames, ceoNm,
                        filmoNames: movieNms
                    };
                    MovieCorpModel.create(document)
                        .then(() => console.log(`${page} 페이지 ${index} 아이템 저장`))
                        .catch(err => backup(data, `${page}_${index}`));
                });
            })
            .catch(err => console.log(err));
        await delay(1000);
    }
})();

function backup(document: any, fileName: string) {
    const filePath = path.resolve(appRootPath(), 'backup', `${fileName}.json`);
    fs.writeFile(filePath, JSON.stringify(document), () => {});
}