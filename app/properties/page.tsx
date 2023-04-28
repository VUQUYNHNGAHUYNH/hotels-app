import getProperties from "../actions/getProperties";
import EmptyState from "../components/EmptyState";
import PropertiesList from "./PropertiesList";

const PropertiesPage = async () => {
  const properties = await getProperties();

  if (properties.length === 0) return <EmptyState showReset />;

  return <PropertiesList properties={properties} />;
};

export default PropertiesPage;
