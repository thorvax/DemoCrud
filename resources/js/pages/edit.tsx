import { Link, useForm } from '@inertiajs/react';
interface Category {
    id: number;
    name: string;
}
interface Product {
    id: number;
    name: string;
    category_id: number;
    description: string;
    price: number;
    stock: number;
}
interface Props {
    product: Product;
    categories: Category[];
}
export default function edit({ product, categories }: Props) {
    const { data, setData, put } = useForm({
        name: product.name,
        category: product.category_id.toString(),
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('product.update', product.id));
    };
    return (
        <div className="m-5">
            <Link className="rounded bg-blue-600 px-4 py-2 text-white" href="/products">
                Back
            </Link>
            <h1 className="mt-5">Create Product</h1>
            <form onSubmit={submit}>
                <div>
                    <label>Name:</label>
                    <input type="text" className="border" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                </div>
                <div>
                    <label>Category</label>
                    <select className="border" value={data.category} onChange={(e) => setData('category', e.target.value)}>
                        <option value="">Select Category</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Description:</label>
                    <br></br>
                    <textarea
                        className="border"
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" className="border" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                </div>
                <div>
                    <label>Stock:</label>
                    <input type="number" className="border" value={data.stock} onChange={(e) => setData('stock', e.target.value)} />
                </div>
                <button type="submit" className="m-3 rounded bg-blue-600 px-4 py-2 text-white">
                    Save
                </button>
            </form>
        </div>
    );
}
