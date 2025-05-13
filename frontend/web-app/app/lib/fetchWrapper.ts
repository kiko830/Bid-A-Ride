import { auth } from "@/auth";

const baseUrl = process.env.API_URL;

async function get(url:string) {
    const requestOptions ={
        method: 'GET',
        headers: await getHeaders(),
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handelResponse(response);
}

async function post(url:string, body: object) {
    const requestOptions ={
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body),
    }

    const response = await fetch(baseUrl + url, requestOptions);
    console.log('response', response);
    return handelResponse(response);
}

async function put(url:string, body: object) {
    const requestOptions ={
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body),
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handelResponse(response);
}

async function del(url:string) {
    const requestOptions ={
        method: 'DELETE',
        headers: await getHeaders()
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handelResponse(response);
}

async function getHeaders(){
    const session = await auth();
    const headers = {
        'Content-type': 'application/json',
    } as any;
    if (session?.accessToken) {
        headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return headers;
}
async function handelResponse(response: Response) {
    const text = await response.text();

    let data;
    try{
        data = JSON.parse(text);
    }catch{
        data = text;
    }
   
    if (!response.ok) {
        const error = {
            status: response.status,
            message:typeof data === 'string'? data: response.statusText,
        }
        return {error};
    }
    return data || response.statusText;
}

export const fetchWrapper ={
    get,post,put,del
}