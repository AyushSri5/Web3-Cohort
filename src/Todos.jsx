import { useQuery, useQueryClient } from "@tanstack/react-query"

export function Todos() {
    // Access the client
    const queryClient = useQueryClient()

    async function getter() {
        const data = await fetch("https://jsonplaceholder.typicode.com/posts/");
        const response = await data.json();
        return response;
      }
  
    // Queries
    const {data,isLoading,error} = useQuery({ queryKey: ['todos'], queryFn: getter})
    if(isLoading){
        return (
            <h1>Loading.....</h1>
        )
    }
    else
    return (
       <div>
        <ul>{data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
      </div>
    )
  }
  