import getBookings from "@/app/actions/getBookings";
import getPropertiesById from "@/app/actions/getPropertiesById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "./PropertiesClient";

type IParams = {
  propertiesId?: string;
};

const PropertiesPage = async ({ params }: { params: IParams }) => {
  const properties = await getPropertiesById(params);
  const bookings = await getBookings(params);

  if (!properties) return <EmptyState />;
  return (
    <Container>
      <PropertiesClient properties={properties} bookings={bookings} />
    </Container>
  );
};

export default PropertiesPage;
