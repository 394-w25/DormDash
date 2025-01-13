import LocationIcon from "./LocationIcon.jsx";
import MoneyIcon from "./MoneyIcon.jsx";
import ClockIcon from "./ClockIcon.jsx";

const Request = ({ request }) => {
  return (
    <>
      {/* Title and Badge */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{request.title}</h2>
        <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
          Completed
        </span>
      </div>

      {/* Request Description */}
      <p className="text-gray-700 mb-4">{request.description}</p>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-500">
        {/* Location */}
        <div className="flex items-center">
          <LocationIcon />
          Location: {request.location}
        </div>

        {/* Compensation */}
        <div className="flex items-center">
          <MoneyIcon />
          Compensation: ${request.compensation}
        </div>

        {/* Completed On */}
        <div className="flex items-center">
          <ClockIcon />
          Completed on: {new Date(request.timestamp).toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default Request;
