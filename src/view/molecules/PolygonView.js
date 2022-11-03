export default function PolygonView({ funcTransform, polygon, color }) {
  const dList = polygon.map(function (coordinate, iCoordinate) {
    const [x, y] = funcTransform(coordinate);
    const label = iCoordinate === 0 ? "M" : "L";
    return label + parseInt(x) + "," + parseInt(y);
  });
  const d = dList.join("");
  return <path d={d} fill={color} stroke={color} strokeWidth="1" />;
}
