import blankPicture from "/blank-profile-circle.png";

const ProfilePicture = ({ photoURL }) => {
  return (
    <img
      src={photoURL ? photoURL : blankPicture}
      className="rounded-full h-full"
    ></img>
  );
};

export default ProfilePicture;
