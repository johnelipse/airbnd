"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useSingleProperty } from "@/hooks/use-data-hook";

export default function PropertyDetails({ slug }: { slug: string }) {
  const { property, isLoading } = useSingleProperty(slug);
  if (isLoading) {
    return (
      <div className="max-w-3xl flex justify-center items-center mx-auto p-8">
        <p className="text-xl animate-pulse ">Loading...</p>
      </div>
    );
  }
  return (
    <div className="container py-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">{property?.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{property?.location}</Badge>
            <div className="flex items-center gap-1">
              <span className="text-sm">⭐ 5.0</span>
              <span className="text-sm text-muted-foreground">
                (79 reviews)
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Share</Button>
            <Button variant="outline">Save</Button>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="col-span-2 row-span-2">
          <Image
            src={property?.images[0] as string}
            alt="Living room with sofa and kitchen"
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div className="relative">
          <Image
            src={property?.images[0] as string}
            alt="Sofa area"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div>
          <Image
            src={property?.images[1] as string}
            alt="Kitchen view"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div className="relative">
          <Button
            variant="secondary"
            className="absolute hidden bottom-4 right-4"
          >
            Show all photos
          </Button>
          <Image
            src={property?.images[2] as string}
            alt="Bedroom"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="border-b pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  Room in {property?.location}
                </h2>
                {/* <p className="text-muted-foreground">
                  Superhost · 3 years hosting
                </p> */}
              </div>
              <Avatar>
                <div className="w-12 h-12 rounded-full bg-muted" />
              </Avatar>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>{property?.bedrooms} double bed</span>
              <span>{property?.bedrooms} bathroom</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About this place</h3>
              <p className="text-muted-foreground">{property?.description}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold">What the place offers</h1>
              <div>
                {property?.amenities.map((aman, i) => {
                  return (
                    <p className="text-muted-foreground" key={i}>
                      {aman}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <Card className="p-6 h-fit display-no sticky  top-4">
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-2xl font-bold">US${property?.price}</span>
              <span className="text-muted-foreground">/night</span>
            </div>
            <Badge variant="secondary" className="w-full justify-center py-1">
              <span className="text-rose-500 mr-2">💎</span>
              This is a rare find
            </Badge>
          </div>

          <div className="border rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="border rounded-lg p-2">
                <div className="text-sm font-medium">Check-in</div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  2/21/2025
                </div>
              </div>
              <div className="border rounded-lg p-2">
                <div className="text-sm font-medium">Checkout</div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  2/26/2025
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-2">
              <div className="text-sm font-medium">Guests</div>
              <div>{property?.maxGuests} guest</div>
            </div>
          </div>

          <Button className="w-full mb-4 bg-rose-500">Reserve</Button>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>US$240,934 x 5 nights</span>
              <span>US$1,204,671</span>
            </div>
            <div className="flex justify-between">
              <span>Cleaning fee</span>
              <span>US$76,487</span>
            </div>
            <div className="flex justify-between">
              <span>Airbnb service fee</span>
              <span>US$213,407</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-4">
              <span>Total before taxes</span>
              <span>US$1,494,565</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
