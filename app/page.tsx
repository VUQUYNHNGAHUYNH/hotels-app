import getProperties from "./actions/getProperties";
import Card from "./components/Card";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";

export default async function Home() {
  const properties = await getProperties();

  if (properties.length === 0) return <EmptyState showReset />;
  return (
    <Container>
      <div className="pt-24 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
        {properties.map((property) => (
          <Card key={property.id} data={property} />
        ))}
      </div>
    </Container>
  );
}
