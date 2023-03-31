// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prismaClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case "GET":
			const books = await prisma.book.findMany();
			res.status(200).json({ data: books });
			break;
		case "POST":
			if (!req.body.book_name)
				return res.status(400).json({ error: "Missing name" });
			const book = await prisma.book.create({
				data: req.body,
			});
			res.status(201).json({ data: book });
			break;

		default:
			res.status(405).end(`Method ${req.method} Not Allowed`);
			break;
	}
}
