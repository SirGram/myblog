import {  useQuery } from "@tanstack/react-query";
import { fetchBlog, fetchBlogs, fetchUsers } from "./api";

export function useBlogsQuery() {
    const { isLoading, error, data = [] } = useQuery({
      queryKey: ["blogs"],
      queryFn: fetchBlogs,
    });
  
    return { isLoading, error, data };
  }
  export function useBlogQuery(id: string | undefined) {
    const { isLoading, error, data  } = useQuery({
      queryKey: ["blogs", id],
      queryFn: () => (id ? fetchBlog(id) : Promise.reject("No ID provided")),
    });
  
    return { isLoading, error, data };
  }

  export function useUsersQuery() {
    const { isLoading, error, data = [] } = useQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
    });
  
    return { isLoading, error, data };
  }