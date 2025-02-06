/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wifi, Car, Utensils, Loader } from "lucide-react";
import type { Category } from "@prisma/client";
import { useForm, Controller } from "react-hook-form";
import FormSelectInput from "../formIniputs/form-select";
import TextInput from "../formIniputs/text-input";
import TextArea from "../formIniputs/textarea";
import MultipleImageInput from "../formIniputs/multiple-image-input";
import toast from "react-hot-toast";

export interface FormValues {
  title: string;
  images: string[];
  slug: string;
  description: string;
  propertyType: string;
  maxGuests: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  location: string;
  price: number;
  categoryId: string;
}

export default function PropertyListingForm({
  categories,
}: {
  categories: Category[];
}) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      propertyType: "entire-place",
      amenities: [],
    },
  });

  const [productImages, setProductImages] = useState([
    "/placeholder.png",
    "/placeholder.png",
    "/placeholder.png",
  ]);

  const [selectedCat, setSelectedCat] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const selectCategory = categories.map((cat) => ({
    value: cat.id,
    label: cat.title,
  }));

  async function onSubmit(data: FormValues) {
    data.categoryId = selectedCat.value;
    data.price = Number(data.price);
    (data.images = productImages),
      (data.slug = data.title.split(" ").join("-").toLowerCase());
    try {
      setLoading(true);
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res) {
        setLoading(false);
        reset();
        toast.success("😂 Property created successfully.");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("😒 Something went wrong.");
    }
  }

  //   const onSubmit = async (data: FormValues) => {
  //     data.categoryId = selectedCat.value;
  //     data.price = Number(data.price);
  //     (data.images = productImages),
  //       (data.slug = data.title.split(" ").join("-").toLowerCase());
  //     try {
  //       setLoading(true);
  //       const res = await fetch("/api/properties", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       if (res) {
  //         setLoading(false);
  //         reset();
  //         toast.success("😂 Property created successfully.");
  //       } else {
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //       toast.error("😒 Something went wrong.");
  //     }
  //   };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">List Your Property</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Property Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Times</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <div className="space-y-6">
                  <div className="grid gap-3 pt-3">
                    <TextInput
                      register={register}
                      errors={errors}
                      label="Property Title"
                      name="title"
                    />
                  </div>
                  <div className="grid gap-3">
                    <TextArea
                      register={register}
                      errors={errors}
                      label="Product Description"
                      name="description"
                    />
                  </div>
                  <div>
                    <FormSelectInput
                      label="Category"
                      options={selectCategory}
                      option={selectedCat}
                      setOption={setSelectedCat}
                      toolTipText="Add New Category"
                      href="/dashboard/inventory/categories/new"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <Controller
                      name="propertyType"
                      control={control}
                      rules={{ required: "Property type is required" }}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <Label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary">
                            <RadioGroupItem
                              value="entire-place"
                              id="entire-place"
                            />
                            <span>Entire Place</span>
                          </Label>
                          <Label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary">
                            <RadioGroupItem
                              value="private-room"
                              id="private-room"
                            />
                            <span>Private Room</span>
                          </Label>
                          <Label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer [&:has(:checked)]:border-primary">
                            <RadioGroupItem
                              value="shared-room"
                              id="shared-room"
                            />
                            <span>Shared Room</span>
                          </Label>
                        </RadioGroup>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Controller
                      name="maxGuests"
                      control={control}
                      rules={{ required: "Max guests is required" }}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor="maxGuests">Max Guests</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
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
                      )}
                    />
                    <Controller
                      name="bedrooms"
                      control={control}
                      rules={{ required: "Bedrooms is required" }}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor="bedrooms">Bedrooms</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
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
                      )}
                    />
                    <Controller
                      name="bathrooms"
                      control={control}
                      rules={{ required: "Bathrooms is required" }}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label htmlFor="bathrooms">Bathrooms</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
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
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Amenities</Label>
                    <Controller
                      name="amenities"
                      control={control}
                      render={({ field }) => (
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
                                checked={field.value?.includes(id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), id]
                                    : (field.value || []).filter(
                                        (item) => item !== id
                                      );
                                  field.onChange(updatedValue);
                                }}
                              />
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                              </div>
                            </Label>
                          ))}
                        </div>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pricing">
                <div className="space-y-6">
                  <TextInput
                    type="number"
                    register={register}
                    errors={errors}
                    label="Property Price per night"
                    name="price"
                  />
                  <TextInput
                    type="text"
                    register={register}
                    errors={errors}
                    label="Property Location"
                    name="location"
                  />
                </div>
              </TabsContent>
              <TabsContent value="images">
                <div className="space-y-6">
                  <MultipleImageInput
                    title="Property Images"
                    imageUrls={productImages}
                    setImageUrls={setProductImages}
                    endpoint="imageUploader"
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end mt-8">
              {loading ? (
                <Button disabled>
                  <Loader className="w-4 h-4 animate-spin flex items-center justify-center gap-2" />
                  Submiting...
                </Button>
              ) : (
                <Button type="submit">Submit Listing</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
