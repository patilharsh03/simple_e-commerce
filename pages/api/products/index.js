import { products } from "@/data/products";

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(products);
    } else if (req.method === 'POST') {
        const { name, price, imageUrl } = req.body;

        if (!name || !price || !imageUrl) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProduct = {
            id: Date.now().toString(), // simple ID
            name,
            price,
            imageUrl
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}