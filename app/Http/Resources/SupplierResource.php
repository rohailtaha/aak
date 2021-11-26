<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource {

  public function toArray($request) {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email ?? '',
      'contact' => $this->contact,
      'address' => $this->address,
      'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : '',
    ];
  }
}
