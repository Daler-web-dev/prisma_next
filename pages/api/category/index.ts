// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prismaClient";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {

	switch (req.method) {
		case "GET":
			const categories = await prisma.category.findMany();
			res.status(200).json({ data: categories });		
			break;
		case "POST":
			if(!req.body.name) return res.status(400).json({error: 'Missing name'})
			const category = await prisma.category.create({
				data: req.body
			});
			res.status(201).json({data: category})
			break;
		
		
	
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`)
			break;
	}

}
