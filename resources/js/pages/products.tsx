import { Link, router } from '@inertiajs/react';
interface Category {
    id: number;
    name: string;
}
interface Product {
    id: number;
    category: Category;
    name: string;
    description: string;
    price: number;
    stock: number;
}
interface Props {
    products?: Product[];
}
export default function products({ products }: Props) {
    return (
        <div className="m-5">
            <Link className="m-5 rounded bg-blue-600 px-4 py-2 text-white" href={route('add_product')}>
                Add Product
            </Link>
            <table className="m-5 border border-slate-300 [&_td]:border [&_td]:p-4 [&_th]:border">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.category.name}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Link href={`/products/${product.id}/edit`}>Edit</Link>
                                {'|'}
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this product?')) {
                                            router.delete(`/products/${product.id}`);
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
