


"use client";
import { Scanner } from "@yudiel/react-qr-scanner";

interface Props {
  onScanSuccess: (value: string) => void;
  onClose: () => void;
}

const SerialScanner = ({ onScanSuccess, onClose }: Props) => {
  return (
    <div className="p-4 bg-black rounded-md">
      <Scanner
        onScan={(result) => {
          if (!result?.length) return;

          const value = result[0].rawValue;

          onScanSuccess(value);
          onClose(); // auto close after scan
        }}
        onError={(err) => console.log(err)}
        constraints={{
          facingMode: "environment",
        }}
      />

      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
};

export default SerialScanner;