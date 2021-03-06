<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory {

  protected $model = Product::class;

  public function definition() {
    return [
      'shop_id' => 1,
      'barcode' => $this->faker->ean8(),
      'name' => $this->faker->name(),
      'category_id' => $this->faker->numberBetween(1, 2),
      'description' => $this->faker->text(),
      'quantity' => $this->faker->numberBetween(20, 1000),
      'alert_quantity' => $this->faker->numberBetween(2, 15),
      'purchase_price' => $this->faker->randomFloat(2, 100, 1000000),
      'sale_price' => $this->faker->randomFloat(2),
      'discount' => $this->faker->randomFloat(2, 0, 100),
      'final_sale_price' => $this->faker->randomFloat(2),

    ];
  }
}
