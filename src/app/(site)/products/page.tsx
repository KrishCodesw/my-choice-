import { Metadata } from "next";
import { CatalogClient } from "./CatalogClient";
import { client } from "../../../../sanity/lib/client"; // Adjust this import path to match your Sanity setup
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Full Catalog | MyChoice",
  description:
    "Browse our complete inventory of electrical, hardware, and sanitary products.",
};

// Optional: Revalidate this page every 60 seconds so new Sanity products show up automatically
export const revalidate = 60;

async function getProducts(): Promise<Product[]> {
  // GROQ Query to fetch products and resolve the image URL and brand name
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    sector,
    "brand": brand->{ name },
    category,
    spec,
    isFeatured,
    isNew,
    image {
      asset->{
        url
      }
    }
  }`;

  return await client.fetch(query);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <CatalogClient initialProducts={products} />;
}
