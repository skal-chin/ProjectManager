export const Button = ({ children, ...other }) => {
  return (
    <button className="bg-pink-500 hover:bg-pink-600 text-white text-center py-1 px-3 rounded-full" {...other}>
      {children}
    </button>
  );
};
