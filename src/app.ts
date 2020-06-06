import './infrastructure/mongoose'
import MovieSimpleModel from "./model/MovieSimpleModel";
import * as fs from 'fs'
import * as path from 'path'
import {appRootPath} from "./utils/appRootPath";
import axios from 'axios';
import delay from "delay";

let axiosInstance = axios.create({ baseURL: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json' });

const TOTAL_PAGE = Math.floor(75961 / 100) + 1;
const API_KEY = '20ead14dd4a4d1b8107cbec397c39f7b';
const itemPerPage = 100;

(async () => {
    for (let page = 154; page <= TOTAL_PAGE; page++) {
        console.log(`${page} 페이지 시작`)
        axiosInstance.get('', { params: { key: API_KEY, itemPerPage, page } })
            .then(({ data }) => {
                // console.log(`${page} 응답 Success`)
                const { movieList } = data.movieListResult;
                const list = Array.from(movieList);
                list.forEach((movie, index) => {
                    MovieSimpleModel.create(movie)
                        .then(() => console.log(`${page} 페이지 ${index} 아이템 저장`))
                        .catch(err => backup(data, `${page}_${index}`));
                });
            })
            .catch(err => console.log(err));
        await delay(2000);
    }
})();

function backup(document: any, fileName: string) {
    const filePath = path.resolve(appRootPath(), 'backup', `${fileName}.json`);
    fs.writeFile(filePath, JSON.stringify(document), () => {});
}