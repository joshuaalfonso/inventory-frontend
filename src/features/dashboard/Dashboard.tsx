
import { Breadcrumb, Heading, Stack, Text } from '@chakra-ui/react';

// interface IDetectedBarcode {
//   boundingBox: IBoundingBox;
//   cornerPoints: IPoint[];
//   format: string;
//   rawValue: string;
// }

// interface IBoundingBox {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// interface IPoint {
//   x: number;
//   y: number;
// }


const Dashboard = () => {

  return (
    <>

      <Breadcrumb.Root mb={6}>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link >Master</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
 
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>Dashboard</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Stack mb={10}>

        <Heading>Dashboard</Heading>
        <Text fontSize={'sm'} color={'fg.muted'}>
          There is nothing here yet
        </Text>

      </Stack>

    </>
  )

  // const [code, setCode] = useState<IDetectedBarcode[]>();
  // const devices = useDevices();
  // const [selectedDevice, setSelectedDevice] = useState(null);

  // const highlightCodeOnCanvas = (detectedCodes, ctx) => {
  //   detectedCodes.forEach((detectedCode) => {
  //     const { boundingBox, cornerPoints } = detectedCode;

  //     // Draw bounding box
  //     ctx.strokeStyle = '#00FF00';
  //     ctx.lineWidth = 4;
  //     ctx.strokeRect(
  //       boundingBox.x,
  //       boundingBox.y,
  //       boundingBox.width,
  //       boundingBox.height
  //     );

  //     // Draw corner points
  //     ctx.fillStyle = '#FF0000';
  //     cornerPoints.forEach((point) => {
  //       ctx.beginPath();
  //       ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
  //       ctx.fill();
  //     });
  //   });
  // };

  // return (
  //   <div>
  //     <div>Dashboard</div>

  //     <div className="w-full  overflow-hidden">

  //       <select onChange={(e) => setSelectedDevice(e.target.value)}>
  //         <option value="">Select a camera</option>
  //         {devices.map((device) => (
  //           <option key={device.deviceId} value={device.deviceId}>
  //             {device.label || `Camera ${device.deviceId}`}
  //           </option>
  //         ))}
  //       </select>
  //       <Scanner
  //         onScan={(result) => setCode(result)}
  //         onError={(error) => console.log(error)}
  //         constraints={{
  //           facingMode: "environment",
  //           aspectRatio: 1, // Square aspect ratio
  //           // Advanced constraints
  //           width: { ideal: 1920 },
  //           height: { ideal: 1080 },
  //         }}
  //         components={{
  //           tracker: highlightCodeOnCanvas,
  //           onOff: true,
  //           torch: true,
  //           zoom: true,
  //           finder: true,
  //         }}
  //         formats={['code_128', 'qr_code']}
  //         allowMultiple={false}
          
  //       />

  //     </div>

  //     {code?.map(item => ( <p> {item.rawValue} - {item.format} </p> ))}
      
  //   </div>
  // )
}

export default Dashboard