const InitialsPicture = ({ displayName }) => {
  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("");
  return (
    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
      {/* Optional Initials */}
      <span className="text-2xl font-semibold text-gray-500">{initials}</span>
    </div>
  );
};

export default InitialsPicture;
