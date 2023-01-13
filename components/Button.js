const Button = ({ children }) => {
  return (
    <button
      className='bg-black dark:bg-white dark:text-teal-700 text-lg text-teal-200 rounded-lg px-5'
      onClick={() => alert(`thanks to ${children}`)}>
      {children}
    </button>)
}

export default Button