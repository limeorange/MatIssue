import Link from "next/link";
import styled from "styled-components";

const DUMMY_DATA = [
  { id: 1, name: "양식" },
  { id: 2, name: "중식" },
  { id: 3, name: "일식" },
  { id: 4, name: "한식" },
];

const CategoryModal = () => {
  return (
    <CategoryModalContainer>
      <CategoryModalUl>
        {DUMMY_DATA.map((category) => (
          <CategoryModalLi key={category.id}>
            <Link href={`/category/${category.name}`} style={{ width: "100%" }}>
              {category.name}
            </Link>
          </CategoryModalLi>
        ))}
      </CategoryModalUl>
    </CategoryModalContainer>
  );
};

export default CategoryModal;

const CategoryModalContainer = styled.div`
  position: absolute;
  z-index: 9;
  top: 5rem;
  left: 0;
  width: 13.4rem;
  padding: 0.6rem 0;
  background-color: white;
  box-shadow: 0px 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-size: 16px;
  font-weight: 400;
  color: #4f3d21;
`;

const CategoryModalUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CategoryModalLi = styled.li`
  display: flex;
  width: 100%;
  text-align: center;
  padding: 0.6rem 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #fbe2a1;
  }
`;
