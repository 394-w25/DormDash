const ProfilePicture = ({ photoURL }) => {
  return (
    <div className="flex items-center justify-center">
      <img src={photoURL} className="w-24 h-24 rounded-full"></img>
    </div>
  );
};

export default ProfilePicture;
