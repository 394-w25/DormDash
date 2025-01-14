import EmailIcon from "./EmailIcon";
import InitialsPicture from "./InitialsPicture";

const ContactInfo = ({ request }) => {
  return (
    <div className="flex flex-col gap-4 text-2xl text-gray-700 my-4">
      <div className="flex flex-row items-center gap-4">
        <InitialsPicture displayName={request.displayName} />
        <p>{request.displayName}</p>
      </div>
      <div className="flex items-center text-gray-400">
        <EmailIcon />
        <p>Email: {request.email}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
