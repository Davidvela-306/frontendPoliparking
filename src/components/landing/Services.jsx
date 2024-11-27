import { servicesData } from "@/constants/landingPage/servicesData";
import { Card, InfoTarget } from "../ui";


/**
 * Renders a section displaying various services offered by the Poliparking system.
 * 
 * This component utilizes the `Card` and `InfoTarget` components to layout and style the services.
 * It maps over the `servicesData` array to dynamically generate each service item, displaying its
 * associated icon and description text.
 * 
 * @returns {JSX.Element} A React component that displays a grid of service information.
 */
const Services = () => {
  return (
    <Card className="flex flex-col justify-center items-center w-[100%] pb-5">
      <h1 className="text-2xl font-bold text-azul-10 my-5">
        Con el sistema de poliparking no tendrás que preocuparte por nada
      </h1>
      <div className="w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {servicesData.map((item) => {
          return (
            <InfoTarget
              key={item.id}
              image={<item.image size="size-12" strokeColor="#fff" />}
              text={item.text}
              className=" w-full align-middle justify-center rounded-lg p-5 shadow-lg bg-amarillo-10"
              classNameText="text-azul-10 text-lg mt-6"
            />
          );
        })}
      </div>
    </Card>
  );
};

export default Services;
