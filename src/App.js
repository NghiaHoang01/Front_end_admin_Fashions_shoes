import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from 'Routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorTextDisabled: '#000',
            colorBgContainerDisabled: '#f5f5f5',
            colorText: '#3a3a3a',
            colorPrimary: '#a8020a',
            colorError: '#c91f28',
            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
          }, components: {
            Table: {
              headerBg: '#a8020a',
              headerColor: '#ffffff',
            }, Modal: {
              titleColor: '#a8020a',
              titleFontSize: '28px'
            }, Card: {
              actionsBg: '#ccc'
            }, Input: {
              controlHeight: '40',
            }, InputNumber: {
              controlHeight: '40',
            }, Select: {
              controlHeight: '40',
            }
          },
        }}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
