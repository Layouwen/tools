// @ts-ignore
import jsonFormat from "json-format";

export const formatJSONStr = (data: string) => {
  const tempVar = `temp${Date.now()}avan`;
  const evalStr = `window.${tempVar} = ${data}`;
  eval(evalStr);
  // @ts-ignore
  const formatData = window[tempVar];
  // @ts-ignore
  delete window[tempVar];

  return {
    string: jsonFormat(formatData, {
      type: "space",
      size: 4,
    }),
    data: formatData,
  };
};
