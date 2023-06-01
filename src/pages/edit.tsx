import { useGlobalData } from '../hook/useGlobalData';
const Edit = () => {
  const { state } = useGlobalData();
  console.log(state);
  return <div>edit</div>;
};

export default Edit;
