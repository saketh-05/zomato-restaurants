
function Restaurant() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_RESTAURANT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { restaurant } = data;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
    </div>
  );
}

export default Restaurant;