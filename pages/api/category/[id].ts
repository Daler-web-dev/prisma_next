import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/prismaClient'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { id } = req.query

    if(!id) return res.status(400).json({ error: 'Missing id' } )
    
    switch (req.method) {
        case 'GET':
        const category = await prisma.category.findUnique({
            where: { id: id as string },
        })
        res.status(200).json({ data: category })
        break;
    
        case 'PATCH':
        if(!req.body.name) return res.status(400).json({ error: 'Missing name' })
    
        const updatedCategory = await prisma.category.update({
            where: { id: id as string },
            data: req.body
        })
        res.status(200).json({ data: updatedCategory })
        break;
    
        case 'DELETE':
        const deletedCategory = await prisma.category.delete({
            where: { id: id as string }
        })
        res.status(200).json({ data: deletedCategory })
        break;
    
        default:
        res.status(405).end(`Method ${req.method} Not Allowed`)
        break;
    }
}