<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
{
    \DB::table('products')->insert([
        'product_name' => 'Sample Product',
        'quantity' => 10,
        'price' => 99.99,
        'description' => 'A sample product description.'
    ]);
}

}
