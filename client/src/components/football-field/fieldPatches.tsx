import type React from "react";

export default function FieldPatches(): React.ReactNode {
  return (
    <>
      <div className="absolute w-full h-full top-0  flex flex-col justify-center items-center -z-40">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="w-full min-h-[12%] relative flex justify-center items-center"
            style={{
              background:
                i % 2 !== 0 ? "var(--light-green)" : "var(--dark-green)",
            }}
          >
            {i % 2 == 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                {Array.from({ length: 10 }, (_, j) => (
                  <div
                    key={j}
                    className="h-full min-w-[12%]"
                    style={{
                      background: j % 2 === 0 ? "var(--green)" : "#00000000",
                    }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {/* <div className="absolute w-full h-full top-0  flex justify-center items-center -z-40">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="h-full min-w-[12%]"
            style={{
              background: i % 2 === 0 ? "var(--green)" : "#00000000",
            }}
          ></div>
        ))}
      </div> */}
    </>
  );
}
