import { products } from "@/data/products";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    products.splice(index, 1);
    res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}