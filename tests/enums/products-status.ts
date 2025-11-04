export enum ProductStatusText {
  IN_STOCK = 'In Stock',
  OUT_OF_STOCK = 'Currently unavailable',
  LIMITED_STOCK = 'Only X left in stock', // pattern example
}

export enum ProductStatusColor {
  IN_STOCK = 'rgb(11, 123, 60)',       // Amazon’s green for "In Stock"
  OUT_OF_STOCK = 'rgb(204, 12, 57)',   // red-ish unavailable
  LIMITED_STOCK = 'rgb(255, 136, 0)',  // orange-ish warning
}