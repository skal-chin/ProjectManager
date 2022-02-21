export const Button = ({ children, ...other }) => {
  return (
    <button className="bg-red-500 hover:bg-red-700 text-white text-center py-1 px-3 rounded-full" {...other}>
      {children}
    </button>
  );
};
