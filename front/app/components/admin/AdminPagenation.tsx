import { SetStateAction } from "react";
import styled from "styled-components";

type PaginationProps = {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
};

const AdminPagination = (props: PaginationProps) => {
  const { total, limit, page, setPage } = props;
  const numPages = Math.ceil(total / limit);

  return (
    <PagenationBox>
      {/* 좌측 이동 버튼 */}
      <PagenationBtn
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        selected={false}
      >
        &lt;
      </PagenationBtn>
      {Array(numPages)
        .fill(undefined)
        .map((_, i) => (
          <PagenationBtn
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
            selected={page === i + 1}
            disabled={false}
          >
            {i + 1}
          </PagenationBtn>
        ))}
      {/* 우측 이동 버튼 */}
      <PagenationBtn
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        selected={false}
      >
        &gt;
      </PagenationBtn>
    </PagenationBox>
  );
};

export default AdminPagination;

const PagenationBox = styled.div`
  border: 1px solid #ddd;
`;

const PagenationBtn = styled.button<{ disabled: boolean; selected: boolean }>`
  width: 4rem;
  height: 4rem;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.disabled ? "white" : "#bbb")};
  }

  ${(props) => props.disabled && "color : #ddd;"}
  ${(props) => props.selected && "background-color : #ccc"}
`;
