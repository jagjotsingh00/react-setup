
const FruitList = () => {
  const fruits = ["Apple","Mango","Banana","Orange","Grapes"];

  return (
    <>
    <ol>{fruits.map((fruits,i) => (
        <li key = {i}>{fruits}</li>
))}</ol>
    </>
  );
}

export default FruitList;