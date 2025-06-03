import { PrismaClient } from "@prisma/client";
import { sendMerchantOrderEmail } from "@/utils/sendOrderAlert";
import { sendOrderConfirmationEmail } from "@/utils/sendReceivemail";
import {
  createActionHeaders,
  NextActionPostRequest,
  ActionError,
  CompletedAction,
} from "@solana/actions";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";
const headers = createActionHeaders();
const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  return Response.json({ message: "Method not supported" } as ActionError, {
    status: 403,
    headers,
  });
};

export const OPTIONS = async () => Response.json(null, { headers });

interface dataType {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: number;
  product_id: string;
  support_email: string;
}

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);

    const data: dataType = JSON.parse(url.searchParams.get("data")!);
    const id = url.searchParams.get("id")!;

    const db_data = await prisma.blink.findUnique({
      where: { id },
    });

    const body: NextActionPostRequest = await req.json();

    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }

    let signature: string;
    try {
      //@ts-ignore
      signature = body.signature;
      if (!signature) throw "Invalid signature";
    } catch (err) {
      throw 'Invalid "signature" provided';
    }

  // send email to both merchant
    await sendMerchantOrderEmail({
      to: db_data?.support_email || "",
      customer_name: data.first_name + " " + data.last_name,
      customer_email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      postcode: data.postcode,
      country: data.country,
      product_id: data.product_id,
      title: db_data?.title || "",
      description: db_data?.description || "",
      image: db_data?.image || "",
    });
    //send email to customer
    await sendOrderConfirmationEmail({
      to: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      address: data.address,
      city: data.city,
      state: data.state,
      postcode: data.postcode,
      country: data.country,
      phone: data.phone,
      product_id: data.product_id,
      title: db_data?.title || "",
      image: db_data?.image || "",
      description: db_data?.description || "",
      support_email: db_data?.support_email || "",
    });
    const payload: CompletedAction = {
      type: "completed",
      title: "Order Created Successfully",
      icon: "https://i.sstatic.net/YbIni.png",
      label: "Complete!",
      description: `Your order has been created successfully. Please check your email for Order confirmation.`,
    };
    return Response.json(payload, {
      headers,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers,
    });
  }
};
