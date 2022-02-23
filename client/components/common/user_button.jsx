export const UserButton = ({ children, ...other }) => {
  return (
    <button className="bg-pink-400 hover:bg-pink-500 text-white text-center py-1 px-3 rounded-full" {...other}>
      {children}
    </button>
  );
};
