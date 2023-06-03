"use client";

import { ToastBar, Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          fontSize: "16px",
          padding: "12px 16px",
          color: "#4F3D21",
          backgroundColor: "#FBE2A1",
        },
        success: {
          iconTheme: {
            primary: "#5CB27A",
            secondary: "white",
          },
        },
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            animation: t.visible
              ? "custom-enter 1s ease"
              : "custom-exit 1s ease",
          }}
        />
      )}
    </Toaster>
  );
};

export default ToasterContext;
