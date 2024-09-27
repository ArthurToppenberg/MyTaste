// /pages/api/auth/register.ts
import Prisma from '../../../utils/server/prisma';
import { hash } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, name, phoneNumber, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await Prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before storing it
        const hashedPassword = await hash(password, 10);

        // Create the user in the database with an associated Profile
        const user = await Prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                profile: {
                    create: {
                        name: name, // Use the provided name or default
                        phoneNumber: phoneNumber || null, // Add phone number to Profile if provided
                    },
                },
            },
        });


        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}
