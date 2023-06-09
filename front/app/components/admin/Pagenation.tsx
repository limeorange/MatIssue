import { SetStateAction } from "react";

type PaginationProps = {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
};

const Pagination = (props: PaginationProps) => {
  const { total, limit, page, setPage } = props;
  const numPages = Math.ceil(total / limit);
  return (
    <>
      <nav>
        {/* 좌측 이동 버튼 */}
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill(undefined)
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          ))}
        {/* 우측 이동 버튼 */}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </>
  );
};

export default Pagination;
