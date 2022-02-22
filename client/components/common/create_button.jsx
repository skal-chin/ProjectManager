export const CreateButton = ({ desc, onClick }) => {
  return (
    <div 
      type='button' 
      onClick={ onClick } 
      className="cursor-pointer 
      transition ease-in .4s border-dashed border-4 border-white
      font-bold 
      rounded 
      m-2 
      p-2 
      text-xl 
      max-w-full 
      text-center 
      hover:bg-pink-300
      hover:border-solid border-4 border-white
      active:bg-pink-200
      text-white">
      Create { desc } +
    </div>
  );
}