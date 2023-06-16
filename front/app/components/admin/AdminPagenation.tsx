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
  const maxDisplayPages = 10; // 한 번에 표시할 최대 페이지 수
  const startPage =
    Math.floor((page - 1) / maxDisplayPages) * maxDisplayPages + 1;
  const endPage = Math.min(startPage + maxDisplayPages - 1, numPages);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PagenationBtn
          key={i}
          onClick={() => setPage(i)}
          aria-current={page === i ? "page" : undefined}
          selected={page === i}
          disabled={false}
        >
          {i}
        </PagenationBtn>
      );
    }
    return pageNumbers;
  };

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
      {renderPageNumbers()}
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
