import getPropertiesById from "@/app/actions/getPropertiesById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "./PropertiesClient";

type IParams = {
  propertiesId?: string;
};

const PropertiesPage = async ({ params }: { params: IParams }) => {
  const properties = await getPropertiesById(params);
  if (!properties) return <EmptyState />;
  return (
    <Container>
      <PropertiesClient properties={properties} />
    </Container>
  );
};

export default PropertiesPage;
