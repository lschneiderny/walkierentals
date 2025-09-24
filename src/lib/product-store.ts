import { promises as fs } from "fs";
import path from "path";
import type { Product } from "./types";

const DATA_FILE = path.join(process.cwd(), "src", "data", "products.json");

export async function readProducts(): Promise<Product[]> {
  const buf = await fs.readFile(DATA_FILE, "utf8").catch(() => "[]");
  return JSON.parse(buf);
}

export async function writeProducts(products: Product[]) {
  const json = JSON.stringify(products, null, 2);
  await fs.writeFile(DATA_FILE, json, "utf8");
}

export async function getProduct(slug: string) {
  const list = await readProducts();
  return list.find((p) => p.slug === slug);
}

export async function upsertProduct(prod: Product) {
  const list = await readProducts();
  const idx = list.findIndex((p) => p.slug === prod.slug);
  if (idx >= 0) list[idx] = prod; else list.push(prod);
  await writeProducts(list);
}

export async function deleteProduct(slug: string) {
  const list = await readProducts();
  const next = list.filter((p) => p.slug !== slug);
  await writeProducts(next);
}


