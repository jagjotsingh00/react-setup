const ProductList = () => {

    const Products = [
  { name: "Item A", price: 200 },
  { name: "Item B", price: 800 },
  { name: "Item C", price: 1200 },
  { name: "Item D", price: 450 }
];

return (
    <>
    {Products.map((e) => e.price > 500)}
    </>
)
}
export default ProductList