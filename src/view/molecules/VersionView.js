import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function VersionView({
  version,
  activeVersion,
  onChangeVersion,
}) {
  const onClick = function () {
    onChangeVersion(version);
  };
  const isActive = activeVersion === version;
  const color = isActive ? "black" : "lightgray";
  const versionParts = version.split("-");
  const title = versionParts[0];
  const subTitle = versionParts.length > 1 ? versionParts[1] : "";
  return (
    <Card sx={{ m: 1, p: 1, cursor: "pointer" }} onClick={onClick}>
      <Typography variant="h6" color={color}>
        {title}
      </Typography>
      <Typography variant="subtitle2" color={color}>
        {subTitle}
      </Typography>
    </Card>
  );
}
