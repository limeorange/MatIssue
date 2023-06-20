// 필요한 모듈을 불러옵니다.
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { useRouter } from "next/router";
import { axiosBase } from "../../api/axios";
import LoginClient from "./LoginClient";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// axios를 mocking합니다.
jest.mock("../../api/axios");
// Next.js의 useRouter 훅을 mocking합니다.
jest.mock("next/navigation", () => ({
  ...require("next-router-mock"),
  useSearchParams: () => jest.fn(),
}));

jest.spyOn(window, "alert").mockImplementation(() => {});

// 초기 상태를 설정합니다.
let push = jest.fn();
let back = jest.fn();

beforeEach(() => {
  // (useRouter as jest.Mock).mockReturnValue({
  //   push: push,
  //   back: back,
  // });

  (axiosBase.post as jest.Mock).mockResolvedValue({
    data: { session_id: "test-session-id" },
  });
});

// axios의 mocking 설정을 초기화합니다.
afterEach(() => {
  jest.clearAllMocks();
});

// QueryClient를 초기화합니다.
const queryClient = new QueryClient();

describe("LoginClient", () => {
  test("should render login form and handle form submission", async () => {
    // LoginClient 컴포넌트를 렌더링합니다.
    const { getByPlaceholderText, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <LoginClient />
      </QueryClientProvider>
    );

    // 유저 아이디와 비밀번호 입력 필드를 찾습니다.
    const userIdInput = getByPlaceholderText("아이디를 입력하세요.");
    const passwordInput = getByPlaceholderText("비밀번호를 입력하세요.");

    // 입력 필드에 값을 입력합니다.
    await act(async () => {
      fireEvent.change(userIdInput, { target: { value: "test-user" } });
      fireEvent.change(passwordInput, { target: { value: "test-pass" } });
    });

    // 로그인 버튼을 클릭합니다.
    await act(async () => {
      fireEvent.click(getByText("로그인"));
    });

    // 로그인 요청이 성공적으로 처리된 후, 토스트 메시지가 출력되는지 확인합니다.
    // await waitFor(() => getByText("로그인 되었습니다."));

    // 라우터의 back 메서드가 호출되었는지 확인합니다.
    // expect(back).toHaveBeenCalled();
  });
});
