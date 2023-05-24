import { ReportHandler } from 'web-vitals';

// https://github.com/GoogleChrome/web-vitals
// 三个关键指标（CLS、FID、LCP）
// 两个辅助指标（FCP、TTFB）
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // 累积布局偏移 Cumulative Layout Shift (CLS) 是测量视觉稳定性的一个以用户为中心的重要指标，因为该项指标有助于量化用户经历意外布局偏移的频率，较低的 CLS 有助于确保一个页面是令人愉悦的。
      getCLS(onPerfEntry);
      // 首次输入延迟 First Input Delay (FID) 是测量加载响应度的一个以用户为中心的重要指标，因为该项指标将用户尝试与无响应页面进行交互时的体验进行了量化，低 FID 有助于让用户确信页面是有效的。
      getFID(onPerfEntry);
      // 最大内容绘制 Largest Contentful Paint (LCP) 是测量感知加载速度的一个以用户为中心的重要指标，因为该项指标会在页面的主要内容基本加载完成时，在页面加载时间轴中标记出相应的点，迅捷的 LCP 有助于让用户确信页面是有效的。
      getLCP(onPerfEntry);

      // 首次内容绘制 First Contentful Paint (FCP) 是测量感知加载速度的一个以用户为中心的重要指标，因为该项指标会在用户首次在屏幕上看到任何内容时，在页面加载时间轴中标记出相应的点，迅捷的 FCP 有助于让用户确信某些事情正在进行。
      getFCP(onPerfEntry);
      // 第一字节时间 Time to First Byte (TTFB) 是在实验室和现场测量连接建立时间和 Web 服务器响应能力的一个基础指标。它有助于识别 Web 服务器何时对请求的响应速度太慢。对 HTML 文档的请求，该指标先于其他所有的加载性能指标。
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
