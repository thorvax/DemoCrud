<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
class ProductController extends Controller
{
    public function index() {
        $products = Product::with('category')->get();
        return Inertia::render('products', ['products'=>$products]);
    }
    public function addProduct() {
        $categories = Category::get();
        return Inertia::render('addProduct', ['categories'=>$categories]);
    }
    public function store(Request $request) {
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'category'=>'required',
            'description' => 'nullable|string',
            'price'=>'required|numeric|min:0',
            'stock'=>'required|integer|min:0'

        ]);
        Product::create([
            'name'=>$validated['name'],
            'category_id'=>$validated['category'],
            'description'=>$validated['description'],
            'price'=>$validated['price'],
            'stock'=>$validated['stock'],
        ]);
        return redirect()->route('products');
    }
    public function edit($id) 
    {
        $product = Product::findOrFail($id);
        $categories = Category::get();
        return Inertia::render('edit', [
            'product'=>$product,
            'categories'=>$categories,
        ]);
    }
    public function update(Request $request, $id) {
        $product = Product::findOrFail($id);
        $validated = $request->validate([
            'name'=>'required|string|max:255',
            'category'=>'required',
            'description' => 'nullable|string',
            'price'=>'required|numeric|min:0',
            'stock'=>'required|integer|min:0'

        ]);
        $product->update([
            'name'=>$validated['name'],
            'category_id'=>$validated['category'],
            'description'=>$validated['description'],
            'price'=>$validated['price'],
            'stock'=>$validated['stock'],
        ]);
        return redirect()->route('products');
    }
    public function destroy($id) {
        $product = Product::findOrFail($id);
        $product->delete();
         return redirect()->route('products');
    }
}
