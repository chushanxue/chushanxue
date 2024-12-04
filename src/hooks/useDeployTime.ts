import { useEffect, useState } from 'react';

const useDeploymentTime = () => {
  const [deploymentTime, setDeploymentTime] = useState<any>(null);

  useEffect(() => {
    const fetchDeploymentTime = async () => {
      // 假设你有一个API返回你最后一次部署的时间
      const response = await fetch('https://api.github.com/repos/chushanxue/chushanxue/commits');
      const data = await response.json();
      const lastCommit = data[0]; // 获取最近的提交信息
      const commitDate = new Date(lastCommit.commit.committer.date);
      setDeploymentTime(commitDate);
    };

    fetchDeploymentTime();
  }, []);

  return deploymentTime;
};

export default useDeploymentTime;
