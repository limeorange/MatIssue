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
          <div
            className="
              fixed 
              inset-0 
              bg-gray-100 
              bg-opacity-50 
              transition-opacity
            "
          />
        </Transition.Child>

        <LoadingContainer>
          <LoadingPositionDiv>
            <PacmanLoader color="#FBD26A" size={25} />
          </LoadingPositionDiv>
        </LoadingContainer>
      </Dialog>
    </Transition.Root>
  );
};

const LoadingContainer = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 10;
  overflow-y: auto;
`;

const LoadingPositionDiv = styled.div`
  display: flex;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
`;

export default LoadingModal;