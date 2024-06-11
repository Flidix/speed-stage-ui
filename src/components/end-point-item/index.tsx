import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import RequestItem from "../request-item";

type EndPointItemProps = {
  endPoint?: TEndPoint;
};
const EndPointItem: React.FC<EndPointItemProps> = ({ endPoint }) => {
  return (
    <Accordion type="single" collapsible className="w-[80%] text-white">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex flex-row w-[90%] justify-between">
            <div>{endPoint?.name}</div>
            <div>{endPoint?.averageResponseTimeInSec} sec</div>
          </div>
        </AccordionTrigger>
        {endPoint?.requests?.map((request) => {
          return (
            <AccordionContent key={request._id}>
              <div className="flex flex-row w-[90%] justify-between">
                <RequestItem
                  request={request}
                  averageResponseTimeInSec={endPoint.averageResponseTimeInSec}
                />
              </div>
            </AccordionContent>
          );
        })}
      </AccordionItem>
    </Accordion>
  );
};

export default EndPointItem;
