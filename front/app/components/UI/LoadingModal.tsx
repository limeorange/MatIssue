"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PacmanLoader } from "react-spinners";
import styled from "styled-components";

const LoadingModal = () => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-80" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <BackdropWrapper />
        </Transition.Child>
        <LoadingContainer>
          <LoadingPositionDiv>
            <PacmanLoader color="#FBD26A" size={25} />
            <div>오늘도 맛이슈와 함께</div>
          </LoadingPositionDiv>
        </LoadingContainer>
      </Dialog>
    </Transition.Root>
  );
};

const BackdropWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  inset: 0px;
  background: #000000;
  opacity: 50%;

  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

const LoadingContainer = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 10000;
  overflow-y: auto;
`;

const LoadingPositionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 16px;
  font-weight: 400;
  color: #fbd26a;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
`;

export default LoadingModal;
