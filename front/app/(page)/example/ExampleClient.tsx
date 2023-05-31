"use client";

import { ClipLoader } from "react-spinners";
import ListingItem from "../../components/listings/ListingItem";
import { ExampleItems } from "../../types";

// 상태관리, 인터랙션등 자바스크립트 동작시키려면 파일 상단에 적어줘야함.

type ExampleListProps = {
  exampleData: {
    title: string;
    description: string;
  };
  exampleItemsData: ExampleItems[];
};

const ExampleList = (props: ExampleListProps) => {
  const { title, description } = props.exampleData;
  return (
    <div className="p-6 flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-bold">{title}</h1>
        <p>{description}</p>
      </div>
      {props.exampleItemsData.map((data) => (
        <ListingItem
          key={data.title}
          title={data.title}
          description={data.description}
        />
      ))}
    </div>
  );
};

export default ExampleList;

// 클라이언트 컴포넌트 - 페이지컴포넌트에서 받아온 데이터를 가지고 상태관리, 인터랙션 등 자바스크립트 코드를 실행
