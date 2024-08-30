interface CenteredRadialBackgroundProps {
  red: number;
  green: number;
  blue: number;
  opacity: number;
}

const CenteredRadialBackground = ({
  red,
  green,
  blue,
  opacity,
}: CenteredRadialBackgroundProps) => {
  return (
    <div className={`absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(${red},${green},${blue},${opacity})_100%)]`} />
  );
}

export default CenteredRadialBackground;
