const Nav = () => {
  return (
    <nav>
      <div className="w-min ml-auto flex flex-row gap-8 px-48 py-4 text-2xl font-semibold">
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
