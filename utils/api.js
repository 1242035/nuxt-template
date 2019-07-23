import Net from "./net";
import Checkenv from './checkenv';

export default class  {

    static newslist(pageIndex,pagesize){
        return Net.postJSON(Checkenv.url.api + "/newslist/", {}, {pageIndex: pageIndex, pagesize: pagesize});
    }

    static newsDelet(Id){
        return Net.getJSON(Checkenv.url.api + "/newsdelet/" + Id);
    }

    static newsEdit(data){
        return Net.postJSON(Checkenv.url.api + "/newsedit/", {}, data);
    }

    static reEdit(Id, data){
        return Net.postJSON(Checkenv.url.api + "/newsedit/" + Id, {}, data);
    }

    static newsOne(Id){
        return Net.getJSON(Checkenv.url.api + "/newsone/" + Id);
    }

    static login(data){
        return Net.postJSON(Checkenv.url.api + "/login", {}, data);
    }

    static logout(){
        return Net.postJSON(Checkenv.url.api + "/logout");
    }

    static JiyanSlide(){
        return Net.getJSON(Checkenv.url.api + "/gt/register-slide?t=" + (new Date()).getTime());
    }

    static JiyanValidate(data){
        return Net.postJSON(Checkenv.url.api + "/gt/validate-slide", {}, data);
    }
}
