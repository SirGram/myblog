import { IBlogEntry, IComment, IUser } from '@/types/types';
import axios from 'axios'

export const baseUrl = import.meta.env.VITE_API_URL;
console.log(baseUrl);

interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "destructive" | null | undefined
}
export async function toastApiCall(apiCall: () => Promise<any>, toast: (options: ToastOptions) => void,errorMessage: string, successTitle: string, successDescription?: string,  ) {
  try {
    const response = await apiCall();
      
    toast({
      description:  successDescription || undefined,
      title: successTitle,
    });
    return response;
  } catch (err) {
    toast({
      variant: "destructive",
      title: "Error",
      description: errorMessage,
    });
    throw err;
  } 
}

export async function addComment(blogId: string, content: string, username?: string): Promise<IComment> {
  console.log(blogId, content, username);
 
  const response = await axios.post(`${baseUrl}/blogs/${blogId}/comments`, {
    content,
    user: username || 'Anonymous',
  });
  return response.data;
}

export async function deleteComment(id: string): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const response = await axios.delete(`${baseUrl}/blogs/${id}/comments/${id}`,  { headers: { "Authorization": `Bearer ${token}` } });
  return response.data;
}

export async function fetchBlogs():Promise<IBlogEntry[]>{
  const response = await axios.get(`${baseUrl}/blogs`);
  return response.data;
}

export async function fetchBlog(id:string):Promise<IBlogEntry>{
  const response = await axios.get(`${baseUrl}/blogs/${id}`);
  return response.data;
}

export async function fetchUsers():Promise<IUser[]>{
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const response = await axios.get(`${baseUrl}/users`, { headers: {"Authorization" : `Bearer ${token}`} });
  return response.data;
}

export async function updateUser(data:{userId:string, username?:string, fullname?:string, settings?:{about?:string, avatarImage?:string}, password?:string,}):Promise<any>{
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const {userId, ...body} = data
  const response = await axios.patch(`${baseUrl}/users/${userId}`, body,{ headers: {"Authorization" : `Bearer ${token}`} });
  return response.data;
}
export async function createUser(body:{username:string, email:string, fullname:string, password:string}):Promise <IUser>{
  const token = localStorage.getItem("token")
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const response = await axios.post(`${baseUrl}/users`, body,{ headers: {"Authorization" : `Bearer ${token}`} });
  return response.data;
}

export async function deleteUser(userId:string): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const response = await axios.delete(`${baseUrl}/users/${userId}`,  { headers: { "Authorization": `Bearer ${token}` } });
  return response.data;
}

export async function createBlog(body: { title: string; content: string; userId: string; image?: string; }): Promise<IBlogEntry> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const response = await axios.post(`${baseUrl}/blogs`, body, { headers: { "Authorization": `Bearer ${token}` } });
  return response.data;
}

export async function updateBlog(data:{blogId:string, userId: string,lastEditionDate:Date, title?: string, content?: string,  image?: string} ): Promise<IBlogEntry> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const {blogId, ...body} = data
  const response = await axios.patch(`${baseUrl}/blogs/${blogId}`, body, { headers: { "Authorization": `Bearer ${token}` } });
  return response.data;
}

export async function deleteBlog(blogId:string): Promise<IBlogEntry> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Missing authorization token");
  }
  const response = await axios.delete(`${baseUrl}/blogs/${blogId}`,  { headers: { "Authorization": `Bearer ${token}` } });
  return response.data;
}
