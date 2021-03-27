import { checkAvailability } from "../../utils/check-availability";

// http://localhost:3000/api/availability?placeId=92&arrivalDate=11/2/2021&nights=2&categoryId=20
export default async (req, res) => {
  const {
    query: { placeId, arrivalDate, nights, categoryId },
    method,
  } = req;
  if (method === "GET") {
    console.log("query: ", placeId, arrivalDate, nights, categoryId);
    const availabilityResponse = await checkAvailability(
      placeId,
      arrivalDate,
      nights,
      categoryId
    );
    console.log(availabilityResponse);
    res.statusCode = 200;
    res.json(availabilityResponse);
  }
};
