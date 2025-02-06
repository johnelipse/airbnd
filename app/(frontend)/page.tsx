import { NoProperties } from "@/components/front/no-data";
import React from "react";

// const properties = [
//   {
//     location: "Moss Beach, California",
//     rating: 4.92,
//     description: "Beach views",
//     dates: "5 nights · Feb 26 – Mar 3",
//     price: 3858,
//     imageUrl:
//       "https://sjc.microlink.io/i3Xbbu_dZ3KKFMbypDu84I3_78gkU3k4wBnFuoltGUYicbE0bd20jJ-dxxh8MszwKcuJV2c8xGWH_tmrWhF2sA.jpeg",
//   },
//   {
//     location: "Daly City, California",
//     rating: 4.82,
//     description: "Beach and bay views",
//     dates: "5 nights · Feb 9 – 14",
//     price: 2948,
//     imageUrl:
//       "https://sjc.microlink.io/i3Xbbu_dZ3KKFMbypDu84I3_78gkU3k4wBnFuoltGUYicbE0bd20jJ-dxxh8MszwKcuJV2c8xGWH_tmrWhF2sA.jpeg",
//   },
//   // Add more properties as needed
// ];

export default function page() {
  return (
    <div className="">
      {/* {properties.map((property, index) => (
        <PropertyCard key={index} {...property} />
      ))} */}
      <NoProperties />
    </div>
  );
}
