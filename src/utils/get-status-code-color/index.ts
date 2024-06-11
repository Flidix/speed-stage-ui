export const getStatusCodeColor = (statusCode: number) => {
  if (statusCode >= 200 && statusCode < 300) {
    return "greenStatusCode";
  } else if (statusCode >= 300 && statusCode < 400) {
    return "yellowStatusCode";
  } else if (statusCode >= 400 && statusCode < 500) {
    return "orangeStatusCode";
  } else if (statusCode >= 500) {
    return "redStatusCode";
  }
};
