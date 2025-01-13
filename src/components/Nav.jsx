const Nav = () => {
  return (
    <nav className="mx-auto md:w-3/4 flex flex-row px-4 pt-4 justify-between text-2xl">
      <a href="/" className="font-black">
        DormDash
      </a>
      <div className="w-min ml-auto flex flex-row gap-2 sm:gap-8 font-medium">
        <a href="/posts" className="hover:underline">
          Home
        </a>
        <a href="/post" className="hover:underline">
          Create
        </a>
        <a href="/profile" className="hover:underline">
          Profile
        </a>
      </div>
    </nav>
  );
};

export default Nav;
