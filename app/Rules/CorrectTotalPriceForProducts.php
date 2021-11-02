<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CorrectTotalPriceForProducts implements Rule {

  public function passes($attribute, $products) {
    foreach ($products as $product) {
      if ($product['final_sale_price'] * $product['quantity'] != $product['total_price']) {
        return false;
      }
    }
    return true;
  }

  public function message() {
    return 'Total Cost of product must be a multiple of Quantity and Per Item Price.';
  }
}