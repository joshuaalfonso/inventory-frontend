


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
        components={{
            onOff: true,
            torch: true,
            zoom: true,
            finder: true,
          }}
          formats={['code_128', 'qr_code']}
        constraints={{
          facingMode: "environment",
          aspectRatio: 1, 
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        }}
      />

      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
};

export default SerialScanner;