import * as https from "https";
import * as cheerio from "cheerio";

const getAvailabilityUrl = (placeId, arrivalDate, nights, categoryId) => {
  return `https://reservemn.usedirect.com/MinnesotaWeb/Accessible/AvailableUnitsADA.aspx?place_id=${placeId}&arrivalDate=${arrivalDate}&nights=${nights}&CatagoryId=${categoryId}`;
};
// 3/1/2017

export const checkAvailability = async (
  placeId,
  arrivalDate,
  nights,
  categoryId
) => {
  return new Promise((resolve, reject) => {
    const response = {
      request: {
        placeId: placeId,
        arrivalDate: arrivalDate,
        nights: nights,
        categoryId: categoryId,
      },
      url: "",
      checked: false,
      availability: undefined,
      errors: [],
    };
    if (!placeId || !arrivalDate || !nights || !categoryId) {
      console.log("values not supplied, closing");
      response.errors.push("Value not supplied");
      return response;
    }
    response.url = getAvailabilityUrl(placeId, arrivalDate, nights, categoryId);
    console.log("in checkAvailability, generated url: ", response.url);

    https
      .get(response.url, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          const $ = cheerio.load(data);

          // console.log($.root().html());
          console.log("info returned from reservations server");

          response.checked = true;

          if (
            $("#mainContent_txtMessage").text() == "No available units found"
          ) {
            console.log("No units were found...");
            response.availability = false;
          } else {
            console.log("units found!");
            response.availability = true;
          }
          resolve(response);
        });
      })
      .on("error", (err) => {
        console.log("Error: " + err.message);
        response.errors.push(err.message);
        return response;
      });
  });
};
