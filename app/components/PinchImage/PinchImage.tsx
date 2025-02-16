'use client';

import { useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { createUseGesture, dragAction, pinchAction } from '@use-gesture/react';
import Image from 'next/image';
import ExampleJPG from '@/public/example.jpg';

const useGesture = createUseGesture([pinchAction, dragAction]);

export default function PinchImage() {
  const refImage = useRef(null);
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    rotateZ: 0,
  }));

  useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    document.addEventListener('gesturestart', handler);
    document.addEventListener('gesturechange', handler);
    document.addEventListener('gestureend', handler);
    return () => {
      document.removeEventListener('gesturestart', handler);
      document.removeEventListener('gesturechange', handler);
      document.removeEventListener('gestureend', handler);
    };
  }, []);

  useGesture(
    {
      onDrag: ({ pinching, cancel, offset: [x, y] }) => {
        const image = refImage.current! as HTMLElement;
        const { width, height } = image.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        if (pinching || (width <= screenWidth && height <= screenHeight)) {
          return cancel();
        }

        const allowX = width > screenWidth;
        const allowY = height > screenHeight;

              // Вычисляем границы
      const maxX = (width - screenWidth) / 2;
      const maxY = (height - screenHeight) / 2;

      // Ограничиваем x и y
      const clampedX = allowX ? Math.min(maxX, Math.max(-maxX, x)) : 0;
      const clampedY = allowY ? Math.min(maxY, Math.max(-maxY, y)) : 0;

      api.start({ x: clampedX, y: clampedY });
      },
      onPinch: ({
        origin: [ox, oy],
        first,
        movement: [ms],
        offset: [s],
        memo,
      }) => {
        if (first) {
          const { width, height, x, y } = (
            refImage.current! as HTMLElement
          ).getBoundingClientRect();
          const tx = ox - (x + width / 2);
          const ty = oy - (y + height / 2);
          memo = [style.x.get(), style.y.get(), tx, ty];
        }

        const image = refImage.current! as HTMLElement;
        const { width, height } = image.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const allowX = width > screenWidth;
        const allowY = height > screenHeight;

        const x = memo[0] - (ms - 1) * memo[2];
        const y = memo[1] - (ms - 1) * memo[3];
        api.start({
          scale: s,
          x: allowX ? x : 0,
          y: allowY ? y : 0,
        });
        return memo;
      },
    },
    {
      target: refImage,
      drag: { from: () => [style.x.get(), style.y.get()] },
      pinch: { scaleBounds: { min: 1, max: 10 }, rubberband: true },
    }
  );

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden bg-gray-100">
      {/* @ts-expect-error */}
      <animated.div
        className="relative w-96 h-96 touch-none"
        ref={refImage}
        style={style}
      >
        <Image
          src={ExampleJPG}
          alt="Zoomable Image"
          layout="fill"
          objectFit="cover"
          draggable={false}
        />
      </animated.div>
    </div>
  );
}
