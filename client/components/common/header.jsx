export const Header = ({ children, ...other}) => {
  return (
    <div className="rounded -b-lg bg-pink-500 text-black flex-1 h-24">
      <div>{children}</div>

    </div>
  );
}