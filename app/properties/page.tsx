import getProperties, { IParams } from "../actions/getProperties";
import EmptyState from "../components/EmptyState";
import PropertiesList from "./PropertiesList";

type PropertiesProps = {
  searchParams: IParams;
};

const PropertiesPage = async ({ searchParams }: PropertiesProps) => {
  const properties = await getProperties(searchParams);

  if (properties.length === 0) return <EmptyState showReset />;

  return <PropertiesList properties={properties} />;
};

export default PropertiesPage;
