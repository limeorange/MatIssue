import RecipeDetail from "./ViewPageClient";

// 레시피 조회 페이지
const ViewPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return <RecipeDetail />;
};

export default ViewPage;
