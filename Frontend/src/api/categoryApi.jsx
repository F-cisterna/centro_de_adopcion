import axiosInstance from './axiosConfig';

export async function findAllCategoryApi(){
    try{
        const res = await axiosInstance.get('/category');
        return res.data;
    }catch(error){
        console.log("==START ERROR==")
        console.log(error);
        console.log("===END ERROR==")
        return null;
    }
}

export async function saveCategoryApi(json){
    try{
        const res = await axiosInstance.post('/category', json);
        return res.data;
    }catch(error){
        console.log("==START ERROR==")
        console.log(error);
        console.log("===END ERROR==")
        return null;
    }
}