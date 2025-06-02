// app/api/coinbase/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { apiKey, checkout_id} = await req.json();
    if (!apiKey || !checkout_id) {
      return NextResponse.json({ error: "apiKey and checkout_id are required" }, { status: 400 });
    }
    const response = await axios.post(
      "https://api.commerce.coinbase.com/charges",
      { checkout_id },
      {
        headers: {
          "X-CC-Api-Key": apiKey,
          "X-CC-Version": "2018-03-22",
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data.data;
    const support_email = data.support_email;
    const USDC = data.pricing?.settlement?.amount;
    console.log("fkikngsupport_email in productId route ", support_email);
    console.log("USDC in productId route ", USDC);
    return NextResponse.json({ support_email, USDC });
  } catch (error: any) {
    console.log('sdlfjsdlfjljkdkdsnfsdkfn sdfsd lcxnvlcxn')
    console.error(error);
    return NextResponse.json({ error: error?.message || "Failed to fetch charge info" }, { status: 500 });
  }
}