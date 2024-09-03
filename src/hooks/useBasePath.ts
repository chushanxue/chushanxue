// 检测当前的环境，返回不同的前缀
export const useBasePath = () => {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development') {
        return '';
    }
    return '/chushanxue';
}