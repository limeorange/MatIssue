import {
  getExampleData,
  getExampleListingData,
} from "../actions/getExampleData";
import ExampleList from "./ExampleClient";

const ExamplePage = async () => {
  const exampleData = await getExampleData();
  const exampleItemsData = await getExampleListingData();
  // 데이터 fetch해오는 곳

  if (!exampleData) {
    return <div>데이터가 없습니다</div>;
  }

  return (
    <ExampleList
      exampleData={exampleData}
      exampleItemsData={exampleItemsData}
    />
  );
};

export default ExamplePage;

// 페이지 컴포넌트 (서버 컴포넌트) - 데이터를 SSR로 받아와서 하위컴포넌트(클라이언트 컴포넌트)한테 뿌려줌
