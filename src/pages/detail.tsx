import { useGlobalData } from '../hook/useGlobalData';
const Detail = () => {
  const { state } = useGlobalData();
  console.log(state);
  return <div>detail</div>;
};

export default Detail;
