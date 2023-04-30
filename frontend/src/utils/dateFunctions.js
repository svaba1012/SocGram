import { formatDistanceToNowStrict } from "date-fns";

export const formatDateDistanceFromNow = (time) => {
  let str = formatDistanceToNowStrict(new Date(time), {
    roundingMethod: "ceil",
  });

  return str;
};
