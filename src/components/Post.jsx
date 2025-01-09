const Post = ({ request }) => {
  return (
    <div className="mx-auto w-full bg-slate-300 rounded-2xl p-5">
      <h3 className="text-3xl font-black">{request.title}</h3>
      <p>{request.location}</p>
      <p>Requested on: {new Date(request.timestamp).toLocaleString()}</p>
      <p>
        Possible Amount Paid: <strong>{request.compensation}</strong>
      </p>
    </div>
  );
};

export default Post;
