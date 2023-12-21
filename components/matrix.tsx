import React, { useEffect, useRef } from "react";

const MatrixToImage = ({
  matrix,
  pixelSize,
}: {
  matrix: any;
  pixelSize: any;
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    const numRows = matrix.length;
    const numCols = matrix[0].length;

    canvas.width = numCols * pixelSize;
    canvas.height = numRows * pixelSize;

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const pixelValue = matrix[i][j];
        context.fillStyle = pixelValue ? "yellow" : "black";
        context.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
      }
    }
  }, [matrix, pixelSize]);

  return <canvas ref={canvasRef} />;
};

export default MatrixToImage;
