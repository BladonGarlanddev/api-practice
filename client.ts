import axios, { Axios, AxiosResponse } from 'axios';

// Getting a resource: https://jsonplaceholder.typicode.com/posts/1
// Listing all resources: https://jsonplaceholder.typicode.com/posts
// Creating a resource: https://jsonplaceholder.typicode.com/posts
// Deleting a resource: https://jsonplaceholder.typicode.com/posts/1

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
  headers: {},
});

const listAllResources = async ():Promise<Post[]> => {
    const result:AxiosResponse<Post[]> = await axiosInstance.get<Post[]>('posts')
    return result.data
}

const getAllTitles = async ():Promise<string[]> => {
    const result:Post[] = await listAllResources()
    let output:string[] = []

    for (let object of result) {
        output.push(object.title)
    }

    return output
}

const getUserPosts = async (userId:number):Promise<Post[]> => {
    const result:Post[] = await listAllResources()
    let output:Post[] = []
    
    for (let post of result) {
        if (post.userId == userId) {
            output.push(post)
        }
    }

    return output
}

const addResource = async (data:Post):Promise<{status:number, data:Post}> => {
    let result:AxiosResponse<Post> = await axiosInstance.post('posts', data)
    return {status:result.status, data:result.data}
}

const updateResource = async(data:Post, postId:number):Promise<{status: number, data:Post}> => {
    let result:AxiosResponse<Post> = await axiosInstance.put(`posts/${postId}`, data)
    return {status: result.status, data: result.data}
}


async function main() {
    let data:Post = {
        userId: 101,
        id: 101,
        title: "hairy balls",
        body: "Big hairy balls"
    }
    let result = await updateResource(data, 1)
    console.log(result)
}

main()
