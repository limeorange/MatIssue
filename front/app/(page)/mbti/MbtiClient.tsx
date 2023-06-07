"use client";

import StartPage from "@/app/components/mbti/StartPage";
import {
  datasState,
  EIState,
  JPState,
  MBTIState,
  SNState,
  TFState,
} from "@/app/store/mbtiAtom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const MbtiClient = () => {
  const [EI, setEI] = useRecoilState(EIState);
  const [SN, setSN] = useRecoilState(SNState);
  const [TF, setTF] = useRecoilState(TFState);
  const [JP, setJP] = useRecoilState(JPState);
  let [datas, setDatas] = useRecoilState(datasState);
  let [MBTI, setMBTI] = useRecoilState(MBTIState);

  useEffect(() => {
    let data = [];
    if (EI > 0) {
      data.push("E");
    } else if (EI < 0) {
      data.push("I");
    }
    if (SN > 0) {
      data.push("S");
    } else {
      data.push("N");
    }
    if (TF > 0) {
      data.push("T");
    } else {
      data.push("F");
    }
    if (JP > 0) {
      data.push("J");
    } else {
      data.push("P");
    }
    setDatas(data.join(""));
    setMBTI(datas);
  }, [EI, SN, TF, JP, datas, setDatas, setMBTI]);

  return (
    <>
      <StartPage />
    </>
  );
};

export default MbtiClient;
