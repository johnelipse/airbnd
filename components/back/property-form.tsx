"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Wifi, Car, Utensils, Timer } from "lucide-react";
import { usePropertyForm } from "@/store/use-property-form";
import type React from "react"; // Added import for React

export default function PropertyListingForm() {
  const {
    step,
    title,
    description,
    propertyType,
    maxGuests,
    bedrooms,
    bathrooms,
    amenities,
    price,
    checkIn,
    checkOut,
    images,
    setStep,
    updateField,
    reset,
  } = usePropertyForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            updateField("images", [...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log({
      title,
      description,
      propertyType,
      maxGuests,
      bedrooms,
      bathrooms,
      amenities,
      price,
      checkIn,
      checkOut,
      images,
    });
    reset(); // Reset form after submission
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">List Your Property</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Enter an attractive title for your property"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Describe your property in detail"
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Property Type</Label>
                <RadioGroup
                  value={propertyType}
                  onValueChange={(value) => updateField("propertyType", value)}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <Label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary">
                    <RadioGroupItem value="entire-place" id="entire-place" />
                    <span>Entire Place</span>
                  </Label>
                  <Label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary">
                    <RadioGroupItem value="private-room" id="private-room" />
                    <span>Private Room</span>
                  </Label>
                  <Label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary">
                    <RadioGroupItem value="shared-room" id="shared-room" />
                    <span>Shared Room</span>
                  </Label>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guests">Max Guests</Label>
                  <Select
                    value={maxGuests}
                    onValueChange={(value) => updateField("maxGuests", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={bedrooms}
                    onValueChange={(value) => updateField("bedrooms", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select
                    value={bathrooms}
                    onValueChange={(value) => updateField("bathrooms", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: "wifi", label: "WiFi", icon: Wifi },
                    { id: "parking", label: "Parking", icon: Car },
                    { id: "kitchen", label: "Kitchen", icon: Utensils },
                  ].map(({ id, label, icon: Icon }) => (
                    <Label
                      key={id}
                      className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary"
                    >
                      <Checkbox
                        id={id}
                        checked={amenities.includes(id)}
                        onCheckedChange={(checked) => {
                          updateField(
                            "amenities",
                            checked
                              ? [...amenities, id]
                              : amenities.filter((item) => item !== id)
                          );
                        }}
                      />
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </div>
                    </Label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Base Price (per night)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      $
                    </span>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => updateField("price", e.target.value)}
                      className="pl-7"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Check-in/out Times</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      <Select
                        value={checkIn}
                        onValueChange={(value) => updateField("checkIn", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Check-in" />
                        </SelectTrigger>
                        <SelectContent>
                          {["14:00", "15:00", "16:00"].map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      <Select
                        value={checkOut}
                        onValueChange={(value) =>
                          updateField("checkOut", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Check-out" />
                        </SelectTrigger>
                        <SelectContent>
                          {["10:00", "11:00", "12:00"].map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Property Photos</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square relative rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Property photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <label className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary">
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Add Photos
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (step < 4) {
                  setStep(step + 1);
                } else {
                  handleSubmit();
                }
              }}
            >
              {step === 4 ? "Submit Listing" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
