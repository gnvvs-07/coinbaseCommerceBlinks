import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { getServerSession } from "next-auth"
import { CoinbaseProductResponse } from "@/lib/products"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");
  console.log("apiKey in session route ", apiKey)

  try {
    const response = await fetch("https://api.commerce.coinbase.com/checkouts", {
      headers: {
        "X-CC-Api-Key": apiKey || "",
        "X-CC-Version": "2018-03-22",
        "Content-Type": "application/json",
      },
      method: "GET",
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: response.status })
    }
    const data: CoinbaseProductResponse = await response.json()

    return NextResponse.json(data.data, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
