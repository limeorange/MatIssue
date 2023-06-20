// 필요한 라이브러리와 모듈을 임포트합니다.
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignupClient from "./SignupClient";
// import { useRouter } from "next/navigation";
import { axiosBase } from "../../api/axios";

// jest를 사용하여 axiosBase와 next/router를 mock합니다.
jest.mock("../../api/axios");
jest.mock("next/navigation", () => ({
  ...require("next-router-mock"),
  useSearchParams: () => jest.fn(),
}));

// SignupClient 컴포넌트에 대한 테스트를 설명하는 describe 블록입니다.
describe("SignupClient", () => {
  // 첫 번째 테스트 케이스입니다. 이 테스트는 컴포넌트가 올바르게 렌더링되는지 확인합니다.
  test("renders correctly", () => {
    // 컴포넌트를 렌더링하고 필요한 쿼리 함수를 가져옵니다.
    const { getByPlaceholderText } = render(<SignupClient />);
    // 각 필드가 문서에 존재하는지 확인합니다.
    expect(getByPlaceholderText("아이디를 입력하세요.")).toBeInTheDocument();
    expect(getByPlaceholderText("이메일을 입력하세요.")).toBeInTheDocument();
    expect(getByPlaceholderText("닉네임을 입력하세요.")).toBeInTheDocument();
    expect(getByPlaceholderText("비밀번호를 입력하세요.")).toBeInTheDocument();
    expect(
      getByPlaceholderText("비밀번호를 한번더 입력하세요.")
    ).toBeInTheDocument();
    expect(getByPlaceholderText("YYYY")).toBeInTheDocument();
    expect(getByPlaceholderText("MM")).toBeInTheDocument();
    expect(getByPlaceholderText("DD")).toBeInTheDocument();
  });

  // 두 번째 테스트 케이스입니다. 이 테스트는 form이 올바른 데이터로 제출되는지 확인합니다.
  test("submits form with correct data", async () => {
    // axiosBase.post와 Router.replace를 mock합니다.
    (axiosBase.post as jest.Mock).mockResolvedValue({ status: 201 });
    // (useRouter().replace as jest.Mock).mockImplementation(jest.fn);

    // 컴포넌트를 렌더링합니다.
    render(<SignupClient />);

    // 각 필드에 데이터를 입력합니다.
    fireEvent.input(screen.getByPlaceholderText("아이디를 입력하세요."), {
      target: { value: "testUser" },
    });
    fireEvent.input(screen.getByPlaceholderText("이메일을 입력하세요."), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("닉네임을 입력하세요."), {
      target: { value: "testNick" },
    });
    fireEvent.input(screen.getByPlaceholderText("비밀번호를 입력하세요."), {
      target: { value: "Test@1234" },
    });
    fireEvent.input(
      screen.getByPlaceholderText("비밀번호를 한번더 입력하세요."),
      {
        target: { value: "Test@1234" },
      }
    );
    fireEvent.input(screen.getByPlaceholderText("YYYY"), {
      target: { value: "1990" },
    });
    fireEvent.input(screen.getByPlaceholderText("MM"), {
      target: { value: "01" },
    });
    fireEvent.input(screen.getByPlaceholderText("DD"), {
      target: { value: "01" },
    });

    // '회원가입' 버튼을 클릭합니다.
    fireEvent.click(screen.getByText("회원가입"));

    // axiosBase.post가 한 번 호출되었는지 확인합니다.
    await waitFor(() => expect(axiosBase.post).toHaveBeenCalledTimes(1));
    // Router.replace가 '/auth/signup/complete'로 호출되었는지 확인합니다.
    // expect(router.replace()).toHaveBeenCalledWith("/auth/signup/complete");
  });

  // 세 번째 테스트 케이스입니다. 이 테스트는 form이 올바른 데이터로 제출되는지 확인합니다.
  test("submits form with incorrect data", async () => {
    // axiosBase.post와 Router.replace를 mock합니다.
    (axiosBase.post as jest.Mock).mockResolvedValue({ status: 400 });
    // (useRouter().replace as jest.Mock).mockImplementation(jest.fn);

    // 컴포넌트를 렌더링합니다.
    render(<SignupClient />);

    // 각 필드에 데이터를 입력합니다.
    fireEvent.input(screen.getByPlaceholderText("아이디를 입력하세요."), {
      target: { value: "testUserhellow" },
    });
    fireEvent.input(screen.getByPlaceholderText("이메일을 입력하세요."), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("닉네임을 입력하세요."), {
      target: { value: "testNick" },
    });
    fireEvent.input(screen.getByPlaceholderText("비밀번호를 입력하세요."), {
      target: { value: "Test@1234" },
    });
    fireEvent.input(
      screen.getByPlaceholderText("비밀번호를 한번더 입력하세요."),
      {
        target: { value: "Test@1234" },
      }
    );
    fireEvent.input(screen.getByPlaceholderText("YYYY"), {
      target: { value: "1990" },
    });
    fireEvent.input(screen.getByPlaceholderText("MM"), {
      target: { value: "01" },
    });
    fireEvent.input(screen.getByPlaceholderText("DD"), {
      target: { value: "01" },
    });

    // '회원가입' 버튼을 클릭합니다.
    fireEvent.click(screen.getByText("회원가입"));

    // axiosBase.post가 한 번 호출되었는지 확인합니다.
    await waitFor(() => expect(axiosBase.post).toHaveBeenCalledTimes(1));
    // Router.replace가 '/auth/signup/complete'로 호출되었는지 확인합니다.
    // expect(router.replace()).toHaveBeenCalledWith("/auth/signup/complete");
  });
});
