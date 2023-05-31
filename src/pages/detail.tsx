import { useGlobalData } from '../context/globalContext';
const Detail = () => {
  const { state } = useGlobalData();
  console.log(state);
  return <div>detail</div>;
};

export default Detail;
