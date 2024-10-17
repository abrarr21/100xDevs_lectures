import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;
function App() {
  const { data, loading } = useQuery(query);
  return (
    <div>
      {loading ? <h1>Loading...</h1> : <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

export default App;
