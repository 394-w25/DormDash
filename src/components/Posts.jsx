import { useDbData } from "../utilities/firebase.js";

const Posts = () => {
  const [data, error] = useDbData("/");
  console.log(data);
  return <>placeholder</>;
};

export default Posts;
