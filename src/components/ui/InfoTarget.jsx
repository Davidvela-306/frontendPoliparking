import { Card } from "@components/ui/index";

const InfoTarget = ({ image, text, classNameText, ...rest }) => {
  return (
    <Card {...rest}>
      <div className="w-full flex justify-center items-center">
        {image}
      </div>
      <div>
        <p className={classNameText}>{text}</p>
      </div>
    </Card>
  );
};

export default InfoTarget;
