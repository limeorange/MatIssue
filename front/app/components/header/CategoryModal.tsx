import Link from "next/link";
import styled from "styled-components";

const CATEGORY_DATA = [
  { name: "양식", qeury: "western" },
  { name: "중식", qeury: "chinese" },
  { name: "일식", qeury: "japanese" },
  { name: "한식", qeury: "korean" },
];

/** 헤더 카테고리 호버시 뜨는 카테고리바 모달 */
const CategoryModal = ({ isModal }: { isModal: boolean }) => {
  return (
    <CategoryModalContainer visible={isModal}>
      <CategoryModalList>
        {CATEGORY_DATA.map((item, index) => (
          <CategoryModalItem key={index}>
            <Link
              href={`/recipes/category/${item.name}?category=${item.qeury}`}
              style={{ width: "100%" }}
            >
              {item.name}
            </Link>
          </CategoryModalItem>
        ))}
      </CategoryModalList>
    </CategoryModalContainer>
  );
};

export default CategoryModal;

const CategoryModalContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  z-index: 50;
  color: #4f3d21;
  background-color: white;
  width: 100%;
  left: 0;
  box-shadow: 0px 0.1rem 0.3rem rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;

  @media (min-width: 768px) {
    top: 5rem;
  }

  @media (min-width: 1024px) {
    top: 5rem;
    padding: 0.3rem 0;
    font-size: 16px;
    font-weight: 400;
    opacity: ${(props) => (props.visible ? "1" : "0")};
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};

    transition: opacity 0.3s;
  }
`;

const CategoryModalList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CategoryModalItem = styled.li`
  display: flex;
  width: 100%;
  text-align: center;
  padding: 0.6rem 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #fbe2a1;
  }

  transition: background-color 0.2s;
`;
