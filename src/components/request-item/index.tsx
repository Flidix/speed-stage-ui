import { getStatusCodeColor } from "@/utils/get-status-code-color";
import React from "react";

type RequestItemProps = {
  averageResponseTimeInSec: number;
  request: TRequest;
};

const RequestItem: React.FC<RequestItemProps> = ({
  request,
  averageResponseTimeInSec,
}) => {
  const statusCodeColor = getStatusCodeColor(request.statusCode);

  const differenceBetweenRequestAndAverage = (
    request.responseTimeInSec - averageResponseTimeInSec
  ).toFixed(2);
  const isFaster = +differenceBetweenRequestAndAverage > 0;

  const renderDifference = () => {
    if (+differenceBetweenRequestAndAverage > 0) {
      return "+" + differenceBetweenRequestAndAverage;
    } else if (+differenceBetweenRequestAndAverage < 0) {
      return "-" + differenceBetweenRequestAndAverage.slice(1);
    }
  };

  return (
    <div>
      <div>
        {request.responseTimeInSec} sec{" "}
        <span
          className={`text-${isFaster ? "redStatusCode" : "greenStatusCode"}`}
        >
          {renderDifference()}
        </span>
      </div>
      <div className={`text-${statusCodeColor}`}>{request.statusCode}</div>
    </div>
  );
};

export default RequestItem;
