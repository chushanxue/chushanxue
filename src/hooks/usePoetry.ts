/**
 * 今日诗词
 */

import { useEffect, useState } from 'react';

export const usePoetry = () => {
  const [poetry, handlePoetry] = useState<any>('');
  const jinrishici = require('jinrishici');
  useEffect(() => {
    jinrishici.load(
      (result: any) => {
        handlePoetry(result.data.content);
      },
      () => {
        handlePoetry('欲买桂花同载酒，终不似，少年游');
      },
    );
  }, []);

  return [poetry];
};
