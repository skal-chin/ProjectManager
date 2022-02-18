export const CreateButton = ({ desc, onClick }) => {
  return (
    <div 
      type='button' 
      onClick={ onClick } 
      className="cursor-pointer 
      transition ease-in .4s bg-green-700 
      font-bold 
      rounded 
      m-2 
      p-2 
      text-xl 
      max-w-full 
      text-center 
      hover:bg-green-900 
      active:bg-green-300 
      text-white">
      Create { desc } +
    </div>
  );
}