import UpdateRecipeForm from "./UpdateRecipe";

const EditRecipe = async ({ params }: { params: { id: string } }) => {
  return <UpdateRecipeForm />;
};

export default EditRecipe;
