// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

let words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "iceberg",
  "jackfruit",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pineapple",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
];

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query.hello);

  const postId = Math.floor(Math.random() * 15) + 1;

  const url = "https://api.binance.com/api/v3/depth?limit=10&symbol=BTCUSDT";

  // const url = "http://localhost:8000/posts/" + postId;

  const response = await fetch(url);
  const data = await response.json();

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.labrwqs.mongodb.net/`
  );
  const db = client.db();

  await db.collection("data").insertOne({ data: data });

  client.close();

  res.status(200).json(data);
}
