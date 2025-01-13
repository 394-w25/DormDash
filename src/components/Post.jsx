const Post = ({ request }) => {
  return (
    <div className="mx-auto w-full bg-slate-300 rounded-2xl p-5 text-center">
      <h3 className="text-3xl font-black">{request.title}</h3>
      <p className="text-2xl">{request.location}</p>
      <p className="text-2xl">
        Requested on: {new Date(request.timestamp).toLocaleString()}
      </p>
      <p className="text-2xl">
        Possible Amount Paid: <strong>{request.compensation}</strong>
      </p>
    </div>
  );
};

export default Post;
